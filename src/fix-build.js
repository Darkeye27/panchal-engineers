import fs from 'fs';
import path from 'path';

const serverDir = path.join(process.cwd(), 'dist', 'server');
const serverAssetsDir = path.join(serverDir, 'assets');
const clientDir = path.join(process.cwd(), 'dist', 'client');
const clientAssetsDir = path.join(clientDir, 'assets');

console.log('Starting improved build fix...');

try {
  // 1. Copy all server assets to client assets
  if (fs.existsSync(serverAssetsDir)) {
    const serverFiles = fs.readdirSync(serverAssetsDir);
    serverFiles.forEach(file => {
      fs.copyFileSync(
        path.join(serverAssetsDir, file),
        path.join(clientAssetsDir, file)
      );
    });
    console.log(`Copied ${serverFiles.length} server assets to client assets.`);
  }

  // 2. Find the worker entry from dist/server/index.js content
  const serverIndexFile = path.join(serverDir, 'index.js');
  if (fs.existsSync(serverIndexFile)) {
    const content = fs.readFileSync(serverIndexFile, 'utf8');
    // Extract the import path (e.g., ./assets/worker-entry-XXX.js)
    const match = content.match(/from\s+["'](\.\/assets\/[^"']+)["']/);
    
    if (match) {
      const relativePath = match[1];
      const absoluteWorkerPath = path.join(serverDir, relativePath);
      
      if (fs.existsSync(absoluteWorkerPath)) {
        fs.copyFileSync(absoluteWorkerPath, path.join(clientDir, '_worker.js'));
        console.log(`Successfully created _worker.js from ${relativePath}`);
      } else {
        console.error(`Worker file not found at ${absoluteWorkerPath}`);
        process.exit(1);
      }
    } else {
      console.error('Could not find worker import in dist/server/index.js');
      process.exit(1);
    }
  } else {
    console.error('dist/server/index.js not found');
    process.exit(1);
  }
} catch (err) {
  console.error('Error during build fix:', err);
  process.exit(1);
}
