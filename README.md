# Press Kit AD

A modern, high-performance press kit website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Performance Optimized**: Turbopack for fast development, SWC for compilation
- **Type Safe**: Full TypeScript support with strict configuration
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier, and Husky for code quality
- **Modern Tooling**: Vite, Turbo, and modern development tools
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Security**: Security headers and audit tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **Testing**: Jest 30, React Testing Library
- **Linting**: ESLint 9, Prettier 3
- **Package Manager**: pnpm 9
- **Build Tools**: Turbopack, SWC, Vite
- **CI/CD**: GitHub Actions

## 📦 Prerequisites

- Node.js 20.18.0 or higher
- pnpm 9.15.0 or higher

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd press-kit-ad

# Install dependencies
pnpm install

# Copy environment variables
cp env.example .env.local
```

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Start development server with Vite (alternative)
pnpm dev:vite

# Run tests in watch mode
pnpm test:watch

# Run linting
pnpm lint

# Run type checking
pnpm typecheck
```

### Building

```bash
# Build for production
pnpm build

# Build with bundle analysis
pnpm build:analyze

# Build with profiling
pnpm build:profile

# Preview production build
pnpm preview
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci

# Debug tests
pnpm test:debug
```

### Code Quality

```bash
# Run all quality checks
pnpm validate

# Format code
pnpm format

# Check formatting
pnpm format:check

# Run security audit
pnpm audit

# Fix security issues
pnpm audit:fix
```

### Performance

```bash
# Analyze bundle size
pnpm size

# Run Lighthouse performance test
pnpm perf

# Clean build artifacts
pnpm clean
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── styles/                # Global styles and CSS
├── types/                 # TypeScript type definitions
└── __tests__/             # Test files
```

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with modern features:

- `exactOptionalPropertyTypes`: true
- `noImplicitReturns`: true
- `noFallthroughCasesInSwitch`: true
- `noUncheckedIndexedAccess`: true

### ESLint

Modern ESLint configuration with:

- Next.js recommended rules
- TypeScript-specific rules
- Import organization
- Accessibility rules
- React best practices

### Prettier

Consistent code formatting with:

- Single quotes
- Semicolons
- Trailing commas
- 80 character line width

## 🚀 Deployment

### Static Export

The project is configured for static export:

```bash
pnpm build
```

The built files will be in the `build/` directory, ready for deployment to any static hosting service.

### Environment Variables

Create a `.env.local` file based on `env.example`:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Press Kit AD"
```

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Page and feature tests
- **Coverage**: 95%+ code coverage requirement
- **CI/CD**: Automated testing on every push

### Test Commands

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch

# Debug tests
pnpm test:debug
```

## 📊 Performance

The project is optimized for performance:

- **Turbopack**: Fast development builds
- **SWC**: Fast production builds
- **Bundle Splitting**: Optimized code splitting
- **Image Optimization**: Next.js Image component
- **Tree Shaking**: Dead code elimination
- **Compression**: Gzip compression enabled

### Performance Monitoring

```bash
# Analyze bundle size
pnpm size

# Run Lighthouse audit
pnpm perf
```

## 🔒 Security

Security features include:

- Security headers
- Dependency auditing
- No console logs in production
- Content Security Policy ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run quality checks: `pnpm validate`
5. Commit your changes
6. Push to your branch
7. Create a Pull Request

### Pre-commit Hooks

The project uses Husky for pre-commit hooks:

- ESLint fixes
- Prettier formatting
- TypeScript checking
- Test running

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using modern web technologies.
