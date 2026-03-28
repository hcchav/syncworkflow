/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const path = require('path');
const { chromium } = require('@playwright/test');

const ROUTES = [
  '/',
  '/request-audit',
  '/sample-review',
  '/review/evergreen-family-law--review-q4m7n2w1',
  '/audit/evergreen-family-law--audit-b8r9t4x2',
];

const PORT = 3001;
const HOST = '127.0.0.1';

async function waitForReady(getLogs, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const logs = getLogs();

    if (logs.includes('Ready in')) {
      return;
    }

    if (logs.includes('Could not find a production build')) {
      throw new Error("Missing production build. Run 'pnpm build' before 'pnpm smoke:prod'.");
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for Next to start.\n\n${getLogs()}`);
}

async function collectRouteIssues(browser, route) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const issues = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      issues.push({
        type: 'console',
        text: msg.text(),
      });
    }
  });

  page.on('pageerror', (error) => {
    issues.push({
      type: 'pageerror',
      text: error.message,
    });
  });

  page.on('requestfailed', (request) => {
    issues.push({
      type: 'requestfailed',
      url: request.url(),
      error: request.failure()?.errorText || 'Unknown request failure',
    });
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      issues.push({
        type: 'response',
        status: response.status(),
        url: response.url(),
      });
    }
  });

  let status = null;
  let title = null;

  try {
    const response = await page.goto(`http://${HOST}:${PORT}${route}`, {
      waitUntil: 'networkidle',
      timeout: 20000,
    });

    status = response?.status() ?? null;
    title = await page.title();
  } catch (error) {
    issues.push({
      type: 'goto_error',
      text: error.message,
    });
  } finally {
    await page.close();
  }

  return { route, status, title, issues };
}

async function main() {
  const nextBin = require.resolve('next/dist/bin/next');
  const child = spawn(process.execPath, [nextBin, 'start', '-H', HOST, '-p', String(PORT)], {
    cwd: process.cwd(),
    env: { ...process.env },
    windowsHide: true,
  });

  let logs = '';

  child.stdout.on('data', (chunk) => {
    logs += chunk.toString();
  });

  child.stderr.on('data', (chunk) => {
    logs += chunk.toString();
  });

  try {
    await waitForReady(() => logs);

    const browser = await chromium.launch({ headless: true });
    const results = [];

    for (const route of ROUTES) {
      results.push(await collectRouteIssues(browser, route));
    }

    await browser.close();

    const failures = results.filter((result) => result.issues.length > 0 || result.status === null);

    console.log(JSON.stringify({ results }, null, 2));

    if (failures.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    child.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
