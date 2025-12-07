#!/usr/bin/env node

/**
 * Production Build Script
 *
 * This script handles the complete production build process including:
 * - Code quality checks
 * - Security audits
 * - Type checking
 * - Testing
 * - Production build
 * - Build optimization
 * - Security header validation
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.bold}${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function runCommand(command, description) {
  try {
    log(`Running: ${command}`, 'blue');
    execSync(command, { stdio: 'inherit' });
    logSuccess(description);
    return true;
  } catch (err) {
    logError(`${description} failed: ${err.message}`);
    return false;
  }
}

function cleanup() {
  logStep('CLEANUP', 'Cleaning up previous builds and cache');

  const dirsToClean = ['.next', 'build', 'coverage', 'node_modules/.cache'];

  dirsToClean.forEach(dir => {
    if (existsSync(dir)) {
      rmSync(dir, { recursive: true, force: true });
      logSuccess(`Cleaned ${dir}`);
    }
  });
}

function checkEnvironment() {
  logStep('ENVIRONMENT', 'Checking environment and dependencies');

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion < 20) {
    logError(
      `Node.js version ${nodeVersion} is not supported. Please use Node.js 20 or higher.`
    );
    process.exit(1);
  }

  logSuccess(`Node.js version: ${nodeVersion}`);

  // Check npm version
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    logSuccess(`npm version: ${npmVersion}`);
  } catch {
    logError('npm is not installed or not in PATH');
    process.exit(1);
  }
}

function installDependencies() {
  logStep('DEPENDENCIES', 'Installing dependencies');

  if (!runCommand('npm ci', 'Installing dependencies')) {
    process.exit(1);
  }
}

function runQualityChecks() {
  logStep('QUALITY', 'Running code quality checks');

  // Type checking
  if (!runCommand('npm run typecheck', 'Type checking')) {
    process.exit(1);
  }

  // Linting
  if (!runCommand('npm run lint', 'Linting')) {
    logWarning('Linting completed with warnings (continuing...)');
  }

  // Format checking
  if (!runCommand('npm run format:check', 'Format checking')) {
    logWarning('Code formatting issues found (continuing...)');
  }
}

function runSecurityAudit() {
  logStep('SECURITY', 'Running security audit');

  if (!runCommand('npm audit --audit-level moderate', 'Security audit')) {
    logWarning('Security vulnerabilities found (continuing...)');
  }

  // Check security headers
  if (!runCommand('npm run security:headers', 'Security headers validation')) {
    logWarning('Security headers validation failed (continuing...)');
  }
}

function runTests() {
  logStep('TESTING', 'Running tests');

  if (!runCommand('npm run test:ci', 'Running tests')) {
    logError('Tests failed - aborting build');
    process.exit(1);
  }
}

function buildProduction() {
  logStep('BUILD', 'Building for production');

  // Set production environment
  process.env.NODE_ENV = 'production';

  if (!runCommand('npm run build', 'Production build')) {
    process.exit(1);
  }
}

function optimizeBuild() {
  logStep('OPTIMIZATION', 'Optimizing build');

  // Compress static assets
  if (runCommand('npm run build:compress', 'Compressing static assets')) {
    logSuccess('Static assets compressed');
  }

  // Show build size
  if (runCommand('npm run build:size', 'Build size analysis')) {
    logSuccess('Build size analyzed');
  }
}

function validateBuild() {
  logStep('VALIDATION', 'Validating production build');

  // Check if build directory exists
  if (!existsSync('.next')) {
    logError('Build directory not found');
    process.exit(1);
  }

  // Check for critical files
  const criticalFiles = [
    '.next/static',
    '.next/server',
    '.next/server/pages-manifest.json',
  ];

  criticalFiles.forEach(file => {
    if (!existsSync(file)) {
      logError(`Critical file missing: ${file}`);
      process.exit(1);
    }
  });

  logSuccess('Build validation passed');
}

function generateBuildReport() {
  logStep('REPORT', 'Generating build report');

  const report = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    buildSize: 'See build:size output above',
    testCoverage: 'See test output above',
    securityStatus: 'See security audit output above',
  };

  log(`\n${'='.repeat(60)}`, 'cyan');
  log('PRODUCTION BUILD COMPLETE', 'bold');
  log(`${'='.repeat(60)}`, 'cyan');
  log(`Timestamp: ${report.timestamp}`, 'white');
  log(`Node.js: ${report.nodeVersion}`, 'white');
  log('Build Directory: .next/', 'white');
  log(`${'='.repeat(60)}`, 'cyan');

  logSuccess('Production build completed successfully!');
  log('\nNext steps:', 'yellow');
  log('1. Test the production build locally: npm start', 'white');
  log('2. Deploy to your hosting platform', 'white');
  log('3. Monitor performance and errors in production', 'white');
}

// Main execution
async function main() {
  try {
    log('🚀 Starting Production Build Process', 'bold');
    log('=====================================', 'cyan');

    cleanup();
    checkEnvironment();
    installDependencies();
    runQualityChecks();
    runSecurityAudit();
    runTests();
    buildProduction();
    optimizeBuild();
    validateBuild();
    generateBuildReport();
  } catch (error) {
    logError(`Build process failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  logError(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logError(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

// Run the build process
main();
