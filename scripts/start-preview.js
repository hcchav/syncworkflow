/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const cwd = process.cwd();
const buildIdPath = path.join(cwd, '.next', 'BUILD_ID');
const pidFilePath = path.join(cwd, '.preview.pid');
const host = process.env.PREVIEW_HOST || '127.0.0.1';
const port = process.env.PREVIEW_PORT || '3000';

if (!fs.existsSync(buildIdPath)) {
  console.error("Missing production build. Run 'pnpm build' before starting the preview.");
  process.exit(1);
}

if (fs.existsSync(pidFilePath)) {
  const existingPid = Number(fs.readFileSync(pidFilePath, 'utf8'));

  if (!Number.isNaN(existingPid)) {
    try {
      process.kill(existingPid, 0);
      console.log(`Preview already running on http://${host}:${port} (pid ${existingPid}).`);
      process.exit(0);
    } catch {
      fs.rmSync(pidFilePath, { force: true });
    }
  }
}

const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'start', '-H', host, '-p', String(port)], {
  cwd,
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
});

child.unref();
fs.writeFileSync(pidFilePath, String(child.pid));

console.log(`Preview started on http://${host}:${port} (pid ${child.pid}).`);
