#!/bin/bash

# Modern Development Setup Script
# This script sets up the development environment with all modern tools

set -e

echo "🚀 Setting up modern development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="20.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is not supported. Please use Node.js 20.0.0 or higher."
    exit 1
fi

print_success "Node.js version $NODE_VERSION is supported"

# Install dependencies
print_status "Installing dependencies..."
npm install

# Set up environment
print_status "Setting up environment variables..."
if [ ! -f .env.local ]; then
    cp env.example .env.local
    print_success "Created .env.local from env.example"
else
    print_warning ".env.local already exists, skipping..."
fi

# Set up Git hooks
print_status "Setting up Git hooks..."
npm run prepare

# Run initial checks
print_status "Running initial quality checks..."

# Type check
print_status "Running TypeScript check..."
npm run typecheck

# Lint check
print_status "Running ESLint check..."
npm run lint

# Format check
print_status "Running Prettier format check..."
npm run format:check

# Test check
print_status "Running tests..."
npm test -- --passWithNoTests

print_success "All checks passed!"

# Build check
print_status "Running build check..."
npm run build

print_success "Build successful!"

# Clean up
print_status "Cleaning up build artifacts..."
npm run clean

print_success "Development environment setup complete! 🎉"

echo ""
echo "📋 Next steps:"
echo "1. Start development server: npm run dev"
echo "2. Run tests: npm test"
echo "3. Check code quality: npm run validate"
echo "4. Build for production: npm run build"
echo ""
echo "🔧 Available commands:"
echo "- npm run dev          # Start development server"
echo "- npm test             # Run tests"
echo "- npm run lint         # Run ESLint"
echo "- npm run format       # Format code with Prettier"
echo "- npm run typecheck    # Run TypeScript check"
echo "- npm run validate     # Run all quality checks"
echo "- npm run build        # Build for production"
echo "- npm run build:size   # Analyze bundle size"
echo ""
echo "Happy coding! 🚀"
