#!/usr/bin/env node

/**
 * Security Headers Checker
 * Validates that security headers are properly configured
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const REQUIRED_HEADERS = [
  'X-Frame-Options',
  'X-Content-Type-Options',
  'X-XSS-Protection',
  'Strict-Transport-Security',
  'Content-Security-Policy',
  'Referrer-Policy',
  'Permissions-Policy',
];

const REQUIRED_CSP_DIRECTIVES = [
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'object-src',
  'frame-ancestors',
];

function checkSecurityHeaders() {
  console.log('🔒 Checking security headers configuration...\n');

  try {
    // Read Next.js config
    const configPath = join(process.cwd(), 'next.config.js');
    const configContent = readFileSync(configPath, 'utf8');

    let hasHeaders = false;
    let hasCSP = false;
    const errors = [];

    // Check if headers function exists
    if (configContent.includes('async headers()')) {
      hasHeaders = true;
      console.log('✅ Headers function found in Next.js config');
    } else {
      errors.push('❌ Headers function not found in Next.js config');
    }

    // Check for required headers
    REQUIRED_HEADERS.forEach(header => {
      if (configContent.includes(header)) {
        console.log(`✅ ${header} header configured`);
      } else {
        errors.push(`❌ ${header} header missing`);
      }
    });

    // Check CSP directives
    if (configContent.includes('Content-Security-Policy')) {
      hasCSP = true;
      REQUIRED_CSP_DIRECTIVES.forEach(directive => {
        if (configContent.includes(directive)) {
          console.log(`✅ CSP ${directive} directive found`);
        } else {
          errors.push(`❌ CSP ${directive} directive missing`);
        }
      });
    } else {
      errors.push('❌ Content-Security-Policy not found');
    }

    // Check security utilities
    const securityPath = join(process.cwd(), 'src/lib/security.ts');
    try {
      const securityContent = readFileSync(securityPath, 'utf8');
      console.log('✅ Security utilities file found');

      if (securityContent.includes('generateCSP')) {
        console.log('✅ CSP generation utility found');
      } else {
        errors.push('❌ CSP generation utility missing');
      }

      if (securityContent.includes('sanitizeInput')) {
        console.log('✅ Input sanitization utility found');
      } else {
        errors.push('❌ Input sanitization utility missing');
      }
    } catch {
      errors.push('❌ Security utilities file not found');
    }

    // Check middleware
    const middlewarePath = join(process.cwd(), 'src/middleware.ts');
    try {
      const middlewareContent = readFileSync(middlewarePath, 'utf8');
      console.log('✅ Security middleware found');

      if (middlewareContent.includes('X-Robots-Tag')) {
        console.log('✅ Additional security headers in middleware');
      }
    } catch {
      errors.push('❌ Security middleware not found');
    }

    // Summary
    console.log('\n📊 Security Headers Summary:');
    console.log(`Headers configured: ${hasHeaders ? '✅' : '❌'}`);
    console.log(`CSP configured: ${hasCSP ? '✅' : '❌'}`);
    console.log(`Total errors: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Security Issues Found:');
      errors.forEach(error => console.log(`  ${error}`));
      process.exit(1);
    } else {
      console.log('\n🎉 All security headers properly configured!');
    }
  } catch (error) {
    console.error('❌ Error checking security headers:', error.message);
    process.exit(1);
  }
}

// Run the check
checkSecurityHeaders();
