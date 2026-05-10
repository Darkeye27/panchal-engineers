import fs from 'fs';
import path from 'path';

const serverDir = path.join(process.cwd(), 'dist', 'server');
const serverAssetsDir = path.join(serverDir, 'assets');
const clientDir = path.join(process.cwd(), 'dist', 'client');
const clientAssetsDir = path.join(clientDir, 'assets');

console.log('Starting diagnostic build fix...');

function scanDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

try {
  console.log('Files in dist/server:', scanDir(serverDir));
  console.log('Files in dist/server/assets:', scanDir(serverAssetsDir));

  // 1. Merge assets
  if (fs.existsSync(serverAssetsDir)) {
    const serverFiles = fs.readdirSync(serverAssetsDir);
    serverFiles.forEach(file => {
      fs.copyFileSync(path.join(serverAssetsDir, file), path.join(clientAssetsDir, file));
    });
    console.log(`Copied ${serverFiles.length} server assets.`);
  }

  // 2. Try to find entry point
  let workerSource = null;
  const serverIndexFile = path.join(serverDir, 'index.js');
  
  if (fs.existsSync(serverIndexFile)) {
    const content = fs.readFileSync(serverIndexFile, 'utf8');
    const match = content.match(/from\s+["'](\.\/assets\/[^"']+)["']/);
    if (match) workerSource = path.join(serverDir, match[1]);
  }

  // Fallback: If no index.js or match, look for a file starting with 'server-' or 'worker-' in assets
  if (!workerSource) {
    const assets = scanDir(serverAssetsDir);
    const fallback = assets.find(f => (f.startsWith('server-') || f.startsWith('worker-entry')) && f.endsWith('.js'));
    if (fallback) workerSource = path.join(serverAssetsDir, fallback);
  }

  if (workerSource && fs.existsSync(workerSource)) {
    fs.copyFileSync(workerSource, path.join(clientDir, '_worker.js'));
    console.log(`Successfully created _worker.js from ${path.basename(workerSource)}`);
  } else {
    console.error('FAILED: Could not identify worker entry point.');
    process.exit(1);
  }
} catch (err) {
  console.error('Error during build fix:', err);
  process.exit(1);
}
