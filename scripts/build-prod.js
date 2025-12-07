#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { buildConfig } from '../build.config.js';

const buildDir = 'build';
const nextDir = '.next';

function log(message) {
  console.log(`[BUILD] ${message}`);
}

function runCommand(command, options = {}) {
  log(`Running: ${command}`);
  try {
    execSync(command, {
      stdio: 'inherit',
      env: { ...process.env, ...buildConfig.production },
      ...options,
    });
  } catch (error) {
    log(`Error running command: ${command}`);
    log(`Error: ${error.message}`);
    process.exit(1);
  }
}

function cleanBuild() {
  log('Cleaning previous build...');
  if (existsSync(buildDir)) {
    rmSync(buildDir, { recursive: true, force: true });
  }
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
  }
}

function buildProject() {
  log('Building project...');
  runCommand('npm run typecheck');
  runCommand('npm run lint');
  runCommand('npm run test:ci');
  runCommand('npm run build');
}

function optimizeBuild() {
  log('Optimizing build...');

  const gzipCommand = `find ${buildDir} -name '*.html' -o -name '*.css' -o -name '*.js' | xargs gzip -k -9 || true`;
  runCommand(gzipCommand);

  log('Build optimization complete!');
}

function analyzeBuild() {
  log('Analyzing build size...');
  runCommand(`du -sh ${buildDir}/`);
  runCommand(
    `find ${buildDir} -name '*.js' -exec wc -c {} + | sort -n | tail -10`
  );
}

function main() {
  log('Starting production build process...');

  cleanBuild();
  buildProject();
  optimizeBuild();
  analyzeBuild();

  log('Production build completed successfully!');
  log(`Build output: ${join(process.cwd(), buildDir)}`);
}

main();
