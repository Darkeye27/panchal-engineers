import fs from 'fs';
import path from 'path';

const serverAssetsDir = path.join(process.cwd(), 'dist', 'server', 'assets');
const clientDir = path.join(process.cwd(), 'dist', 'client');

console.log('Starting build fix...');

try {
  if (!fs.existsSync(serverAssetsDir)) {
    console.error('Directory not found:', serverAssetsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(serverAssetsDir);
  const workerFile = files.find(f => f.startsWith('worker-entry') && f.endsWith('.js'));
  
  if (workerFile) {
    fs.copyFileSync(
      path.join(serverAssetsDir, workerFile),
      path.join(clientDir, '_worker.js')
    );
    console.log(`Successfully copied ${workerFile} to dist/client/_worker.js`);
  } else {
    console.error('Could not find worker-entry file in dist/server/assets. Found files:', files);
    process.exit(1);
  }
} catch (err) {
  console.error('Error during build fix:', err);
  process.exit(1);
}
