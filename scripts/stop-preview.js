/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const pidFilePath = path.join(process.cwd(), '.preview.pid');

if (!fs.existsSync(pidFilePath)) {
  console.log('No preview pid file found.');
  process.exit(0);
}

const pid = Number(fs.readFileSync(pidFilePath, 'utf8'));

if (Number.isNaN(pid)) {
  fs.rmSync(pidFilePath, { force: true });
  console.log('Removed invalid preview pid file.');
  process.exit(0);
}

try {
  process.kill(pid);
  console.log(`Stopped preview process ${pid}.`);
} catch {
  console.log(`Preview process ${pid} was not running.`);
}

fs.rmSync(pidFilePath, { force: true });
