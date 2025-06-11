#!/usr/bin/env node

/**
 * Petabyte Tech Platform - Setup Verification Script
 * 
 * This script verifies that all components of the platform are properly configured
 * and ready for development or deployment.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Petabyte Tech Platform - Setup Verification\n');

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const checkMark = '✅';
const crossMark = '❌';
const warningMark = '⚠️';

let totalChecks = 0;
let passedChecks = 0;
let warnings = 0;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function check(description, condition, isWarning = false) {
  totalChecks++;
  if (condition) {
    log(`${checkMark} ${description}`, 'green');
    if (!isWarning) passedChecks++;
  } else {
    if (isWarning) {
      log(`${warningMark} ${description}`, 'yellow');
      warnings++;
    } else {
      log(`${crossMark} ${description}`, 'red');
    }
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

function directoryExists(dirPath) {
  const fullPath = path.join(process.cwd(), dirPath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

// Core Files Check
log('\n📁 Core Files Verification', 'blue');
check('package.json exists', fileExists('package.json'));
check('next.config.js exists', fileExists('next.config.js'));
check('tailwind.config.ts exists', fileExists('tailwind.config.ts'));
check('tsconfig.json exists', fileExists('tsconfig.json'));
check('prisma/schema.prisma exists', fileExists('prisma/schema.prisma'));
check('.env.example exists', fileExists('.env.example'));
check('README.md exists', fileExists('README.md'));
check('DEPLOYMENT.md exists', fileExists('DEPLOYMENT.md'));
check('PROJECT_SUMMARY.md exists', fileExists('PROJECT_SUMMARY.md'));

// Directory Structure Check
log('\n📂 Directory Structure Verification', 'blue');
check('src/ directory exists', directoryExists('src'));
check('src/app/ directory exists', directoryExists('src/app'));
check('src/components/ directory exists', directoryExists('src/components'));
check('src/lib/ directory exists', directoryExists('src/lib'));
check('src/hooks/ directory exists', directoryExists('src/hooks'));
check('src/translations/ directory exists', directoryExists('src/translations'));
check('public/ directory exists', directoryExists('public'));

// App Router Structure Check
log('\n🔗 App Router Structure Verification', 'blue');
check('src/app/layout.tsx exists', fileExists('src/app/layout.tsx'));
check('src/app/page.tsx exists', fileExists('src/app/page.tsx'));
check('src/app/globals.css exists', fileExists('src/app/globals.css'));
check('src/app/api/ directory exists', directoryExists('src/app/api'));
check('src/app/auth/ directory exists', directoryExists('src/app/auth'));
check('src/app/admin/ directory exists', directoryExists('src/app/admin'));
check('src/app/client/ directory exists', directoryExists('src/app/client'));
check('src/app/services/ directory exists', directoryExists('src/app/services'));

// Authentication Files Check
log('\n🔐 Authentication System Verification', 'blue');
check('src/lib/auth.ts exists', fileExists('src/lib/auth.ts'));
check('src/app/api/auth/[...nextauth]/route.ts exists', fileExists('src/app/api/auth/[...nextauth]/route.ts'));
check('src/app/api/auth/register/route.ts exists', fileExists('src/app/api/auth/register/route.ts'));
check('src/app/auth/login/page.tsx exists', fileExists('src/app/auth/login/page.tsx'));
check('src/app/auth/register/page.tsx exists', fileExists('src/app/auth/register/page.tsx'));

// Database and API Check
log('\n🗄️ Database & API Verification', 'blue');
check('src/lib/prisma.ts exists', fileExists('src/lib/prisma.ts'));
check('src/app/api/orders/route.ts exists', fileExists('src/app/api/orders/route.ts'));
check('src/app/api/repairs/route.ts exists', fileExists('src/app/api/repairs/route.ts'));

// Services and Notification Check
log('\n📧 Services & Notifications Verification', 'blue');
check('src/lib/email.ts exists', fileExists('src/lib/email.ts'));
check('src/lib/telegram.ts exists', fileExists('src/lib/telegram.ts'));

// UI Components Check
log('\n🎨 UI Components Verification', 'blue');
check('src/components/ui/ directory exists', directoryExists('src/components/ui'));
check('src/components/ui/button.tsx exists', fileExists('src/components/ui/button.tsx'));
check('src/components/ui/card.tsx exists', fileExists('src/components/ui/card.tsx'));
check('src/components/ui/input.tsx exists', fileExists('src/components/ui/input.tsx'));
check('src/components/ui/label.tsx exists', fileExists('src/components/ui/label.tsx'));

// Layout Components Check
log('\n🏗️ Layout Components Verification', 'blue');
check('src/components/layout/Navigation.tsx exists', fileExists('src/components/layout/Navigation.tsx'));
check('src/components/layout/Footer.tsx exists', fileExists('src/components/layout/Footer.tsx'));

// Translation System Check
log('\n🌐 Translation System Verification', 'blue');
check('src/translations/sq.ts exists', fileExists('src/translations/sq.ts'));
check('src/translations/en.ts exists', fileExists('src/translations/en.ts'));
check('src/hooks/useLanguage.ts exists', fileExists('src/hooks/useLanguage.ts'));

// Dashboard Pages Check
log('\n📊 Dashboard Pages Verification', 'blue');
check('src/app/client/layout.tsx exists', fileExists('src/app/client/layout.tsx'));
check('src/app/client/page.tsx exists', fileExists('src/app/client/page.tsx'));
check('src/app/admin/layout.tsx exists', fileExists('src/app/admin/layout.tsx'));
check('src/app/admin/page.tsx exists', fileExists('src/app/admin/page.tsx'));

// Service Pages Check
log('\n🛠️ Service Pages Verification', 'blue');
check('src/app/services/pc-configurator/page.tsx exists', fileExists('src/app/services/pc-configurator/page.tsx'));

// Environment Configuration Check
log('\n⚙️ Environment Configuration Check', 'blue');
check('.env.example has DATABASE_URL', 
  fileExists('.env.example') && 
  fs.readFileSync('.env.example', 'utf8').includes('DATABASE_URL')
);
check('.env.example has NEXTAUTH_SECRET', 
  fileExists('.env.example') && 
  fs.readFileSync('.env.example', 'utf8').includes('NEXTAUTH_SECRET')
);
check('.env.example has EMAIL configuration', 
  fileExists('.env.example') && 
  fs.readFileSync('.env.example', 'utf8').includes('EMAIL_HOST')
);
check('.env.example has TELEGRAM configuration', 
  fileExists('.env.example') && 
  fs.readFileSync('.env.example', 'utf8').includes('TELEGRAM_BOT_TOKEN')
);

// Optional Files Check (Warnings)
log('\n⚠️ Optional Files Check', 'blue');
check('.env file exists (copy from .env.example)', fileExists('.env'), true);
check('node_modules/ directory exists (run npm install)', directoryExists('node_modules'), true);

// Package.json Verification
log('\n📦 Package Dependencies Check', 'blue');
if (fileExists('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'next', 'react', 'typescript', 'tailwindcss', 'prisma', '@prisma/client',
    'next-auth', 'zod', 'react-hook-form', 'framer-motion', 'lucide-react',
    'nodemailer', 'node-telegram-bot-api', 'bcryptjs'
  ];
  
  requiredDeps.forEach(dep => {
    const hasInDeps = packageJson.dependencies && packageJson.dependencies[dep];
    const hasInDevDeps = packageJson.devDependencies && packageJson.devDependencies[dep];
    check(`${dep} dependency configured`, hasInDeps || hasInDevDeps);
  });
}

// Final Summary
log('\n' + '='.repeat(60), 'blue');
log('📊 VERIFICATION SUMMARY', 'bold');
log('='.repeat(60), 'blue');

log(`Total Checks: ${totalChecks}`, 'blue');
log(`Passed: ${passedChecks}`, 'green');
log(`Failed: ${totalChecks - passedChecks - warnings}`, 'red');
log(`Warnings: ${warnings}`, 'yellow');

const successRate = Math.round((passedChecks / (totalChecks - warnings)) * 100);
log(`\nSuccess Rate: ${successRate}%`, successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');

if (successRate >= 90) {
  log('\n🎉 EXCELLENT! Your Petabyte Tech platform is ready for development!', 'green');
  log('\nNext steps:', 'blue');
  log('1. Copy .env.example to .env and configure your environment variables');
  log('2. Run npm install to install dependencies');
  log('3. Set up your PostgreSQL database');
  log('4. Run npm run db:generate to generate Prisma client');
  log('5. Run npm run db:migrate to set up the database schema');
  log('6. Run npm run dev to start the development server');
} else if (successRate >= 70) {
  log('\n⚠️ GOOD! Most components are in place, but some files are missing.', 'yellow');
  log('Please check the failed items above and ensure all required files exist.');
} else {
  log('\n❌ Some critical files are missing. Please review the setup guide.', 'red');
}

log('\n📚 Documentation:');
log('- README.md: Complete project overview and setup guide');
log('- DEPLOYMENT.md: Production deployment instructions');
log('- PROJECT_SUMMARY.md: Comprehensive feature documentation');

log('\n🚀 Happy coding with Petabyte Tech platform!', 'green');

// Exit with appropriate code
process.exit(successRate >= 90 ? 0 : 1);