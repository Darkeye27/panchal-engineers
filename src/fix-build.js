import fs from 'fs';
import path from 'path';

const serverDir = path.join(process.cwd(), 'dist', 'server');
const serverAssetsDir = path.join(serverDir, 'assets');
const clientDir = path.join(process.cwd(), 'dist', 'client');
const clientAssetsDir = path.join(clientDir, 'assets');

console.log('Starting structural build fix...');

try {
  // 1. Copy server.js to dist/client/server.js
  const serverJs = path.join(serverDir, 'server.js');
  if (fs.existsSync(serverJs)) {
    fs.copyFileSync(serverJs, path.join(clientDir, 'server.js'));
    console.log('Copied server.js to client root.');
  }

  // 2. Copy all server assets to dist/client/assets
  if (fs.existsSync(serverAssetsDir)) {
    const serverFiles = fs.readdirSync(serverAssetsDir);
    serverFiles.forEach(file => {
      fs.copyFileSync(path.join(serverAssetsDir, file), path.join(clientAssetsDir, file));
    });
    console.log(`Copied ${serverFiles.length} server assets to client/assets.`);
  }

  // 3. Find the worker entry and create a PROXY _worker.js
  let workerFilename = null;
  const serverIndexFile = path.join(serverDir, 'index.js');
  
  if (fs.existsSync(serverIndexFile)) {
    const content = fs.readFileSync(serverIndexFile, 'utf8');
    const match = content.match(/from\s+["']\.\/assets\/([^"']+)["']/);
    if (match) workerFilename = match[1];
  }

  if (!workerFilename) {
    const assets = fs.readdirSync(serverAssetsDir);
    workerFilename = assets.find(f => (f.startsWith('server-') || f.startsWith('worker-entry')) && f.endsWith('.js'));
  }

  if (workerFilename) {
    // Create a proxy worker that preserves relative paths
    const proxyContent = `export { default } from "./assets/${workerFilename}";\n`;
    fs.writeFileSync(path.join(clientDir, '_worker.js'), proxyContent);
    console.log(`Created proxy _worker.js pointing to assets/${workerFilename}`);
  } else {
    console.error('FAILED: Could not identify worker entry point.');
    process.exit(1);
  }
} catch (err) {
  console.error('Error during build fix:', err);
  process.exit(1);
}
