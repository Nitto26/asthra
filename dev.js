import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Automatically resolve real path across Windows junctions / symlinks
const real = fs.realpathSync(process.cwd());
process.chdir(real);

const viteBin = path.resolve(real, 'node_modules/vite/bin/vite.js');
await import(pathToFileURL(viteBin).href);
