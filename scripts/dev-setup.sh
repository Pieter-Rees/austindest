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

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    print_error "pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm"
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
pnpm install

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
pnpm prepare

# Run initial checks
print_status "Running initial quality checks..."

# Type check
print_status "Running TypeScript check..."
pnpm typecheck

# Lint check
print_status "Running ESLint check..."
pnpm lint

# Format check
print_status "Running Prettier format check..."
pnpm format:check

# Test check
print_status "Running tests..."
pnpm test --passWithNoTests

print_success "All checks passed!"

# Build check
print_status "Running build check..."
pnpm build

print_success "Build successful!"

# Clean up
print_status "Cleaning up build artifacts..."
pnpm clean

print_success "Development environment setup complete! 🎉"

echo ""
echo "📋 Next steps:"
echo "1. Start development server: pnpm dev"
echo "2. Run tests: pnpm test"
echo "3. Check code quality: pnpm validate"
echo "4. Build for production: pnpm build"
echo ""
echo "🔧 Available commands:"
echo "- pnpm dev          # Start development server with Turbopack"
echo "- pnpm test         # Run tests"
echo "- pnpm lint         # Run ESLint"
echo "- pnpm format       # Format code with Prettier"
echo "- pnpm typecheck    # Run TypeScript check"
echo "- pnpm validate     # Run all quality checks"
echo "- pnpm build        # Build for production"
echo "- pnpm size         # Analyze bundle size"
echo "- pnpm perf         # Run performance audit"
echo ""
echo "Happy coding! 🚀"
