import fs from 'fs';
import path from 'path';

const serverDir = path.join(process.cwd(), 'dist', 'server');
const serverAssetsDir = path.join(serverDir, 'assets');
const clientDir = path.join(process.cwd(), 'dist', 'client');
const clientAssetsDir = path.join(clientDir, 'assets');

console.log('Starting path-aware build fix...');

try {
  // 1. Copy all server assets to both dist/client/assets AND dist/client root
  // This ensures relative imports like "./file.js" work.
  if (fs.existsSync(serverAssetsDir)) {
    const serverFiles = fs.readdirSync(serverAssetsDir);
    serverFiles.forEach(file => {
      // Copy to assets folder (for standard web access)
      fs.copyFileSync(path.join(serverAssetsDir, file), path.join(clientAssetsDir, file));
      // Copy to root (for worker resolution)
      fs.copyFileSync(path.join(serverAssetsDir, file), path.join(clientDir, file));
    });
    console.log(`Copied ${serverFiles.length} server assets to root and assets folder.`);
  }

  // 2. Find and copy the worker entry
  let workerSource = null;
  const serverIndexFile = path.join(serverDir, 'index.js');
  
  if (fs.existsSync(serverIndexFile)) {
    const content = fs.readFileSync(serverIndexFile, 'utf8');
    const match = content.match(/from\s+["'](\.\/assets\/[^"']+)["']/);
    if (match) {
      const filename = path.basename(match[1]);
      workerSource = path.join(serverAssetsDir, filename);
    }
  }

  if (!workerSource) {
    const assets = fs.readdirSync(serverAssetsDir);
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
