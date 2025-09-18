# Press Kit AD

A modern, high-performance press kit website built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates best practices for production-ready web applications with comprehensive testing, security, and performance optimizations.

## 🚀 Features

### 🎯 **Core Features**

- **Modern Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Performance Optimized**: SWC compilation, optimized builds, code splitting
- **Type Safe**: Full TypeScript support with strict configuration
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier, and Husky for code quality
- **Production Ready**: Optimized for production deployment
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Security**: Security headers and audit tools

### 🚀 **Performance Features**

- **Bundle Optimization**: Reduced from 831kB to 780kB First Load JS
- **Code Splitting**: Dynamic imports and lazy loading
- **Image Optimization**: Next.js Image with WebP/AVIF support
- **Virtual Scrolling**: Efficient rendering of large lists
- **Performance Monitoring**: Core Web Vitals tracking
- **Advanced Caching**: Optimized caching strategies
- **Tree Shaking**: Dead code elimination

### 🔒 **Security Features**

- **Security Headers**: CSP, X-Frame-Options, HSTS, and more
- **Input Validation**: XSS prevention and sanitization
- **Bot Protection**: Rate limiting and suspicious request blocking
- **Dependency Auditing**: Automated security vulnerability scanning
- **Error Handling**: Secure error logging and monitoring

### 🧪 **Testing Features**

- **95%+ Coverage**: Comprehensive test coverage
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Page and feature tests
- **Security Tests**: Security utility and middleware tests
- **Performance Tests**: Performance monitoring and optimization tests

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion

### **Testing & Quality**

- **Testing**: Jest 30, React Testing Library
- **Linting**: ESLint 9, Prettier 3
- **Type Checking**: TypeScript strict mode
- **Code Coverage**: 95%+ coverage requirement
- **Pre-commit Hooks**: Husky with lint-staged

### **Build & Performance**

- **Package Manager**: pnpm 9
- **Build Tools**: SWC, CSS Nano, PostCSS
- **Bundle Analysis**: @next/bundle-analyzer
- **Image Optimization**: Next.js Image with WebP/AVIF
- **Code Splitting**: Dynamic imports and lazy loading

### **Security & Monitoring**

- **Security Headers**: CSP, X-Frame-Options, HSTS
- **Input Validation**: XSS prevention and sanitization
- **Bot Protection**: Rate limiting and suspicious request blocking
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Handling**: Error boundaries and logging

### **Development Tools**

- **IDE**: VS Code with recommended extensions
- **Debugging**: React DevTools, Next.js DevTools
- **Version Control**: Git with conventional commits
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
# Start development server
pnpm dev

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

# Build with optimizations
pnpm build:prod

# Build with bundle analysis
pnpm build:analyze

# Check build size
pnpm build:size
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
# Check build size
pnpm build:size

# Compress build files
pnpm build:compress

# Clean build artifacts
pnpm clean
```

## 📁 Project Structure

```
press-kit-ad/
├── src/                           # Source code
│   ├── app/                      # Next.js App Router pages
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── not-found.tsx         # 404 page
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── ErrorBoundary.tsx # Error boundary component
│   │   │   ├── OptimizedImage.tsx # Optimized image component
│   │   │   ├── SkeletonLoader.tsx # Loading skeleton component
│   │   │   ├── VirtualList.tsx   # Virtual scrolling component
│   │   │   └── PerformanceMonitor.tsx # Performance monitoring
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx        # Header component
│   │   │   └── Footer.tsx        # Footer component
│   │   └── features/             # Feature-specific components
│   │       ├── landingBg.tsx     # Landing background
│   │       └── watch.tsx         # Watch component
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDebounce.ts        # Debounce and throttle hooks
│   │   ├── useMemo.ts            # Advanced memoization hooks
│   │   ├── usePerformance.ts     # Performance monitoring hook
│   │   └── useScroll.ts          # Scroll tracking hook
│   ├── lib/                      # Utility functions and configurations
│   │   ├── security.ts           # Security utilities
│   │   └── utils.ts              # General utilities
│   ├── __tests__/                # Test files
│   │   ├── components/           # Component tests
│   │   ├── hooks/                # Hook tests
│   │   └── lib/                  # Utility tests
│   └── middleware.ts              # Next.js middleware
├── public/                        # Static assets
│   ├── images/                   # Image assets
│   └── icons/                    # Icon assets
├── scripts/                       # Build and utility scripts
│   └── check-security-headers.js # Security header validation
├── .github/                       # GitHub Actions workflows
│   └── workflows/                # CI/CD workflows
├── docs/                          # Documentation
│   ├── API.md                    # API documentation
│   ├── DEPLOYMENT.md             # Deployment guide
│   └── CONTRIBUTING.md           # Contributing guide
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── jest.config.js               # Jest configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Package dependencies and scripts
├── pnpm-lock.yaml              # pnpm lock file
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── SECURITY.md                  # Security documentation
└── README.md                    # This file
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

### Server-Side Rendering

The project is configured for server-side rendering:

```bash
# Build the application
pnpm build

# Start the application
pnpm start
```

The application will run on the configured port (default: 3000) with full server-side features including middleware support. Use your existing PM2 or process manager setup to run the application in production.

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

- **SWC**: Fast production builds
- **Bundle Splitting**: Optimized code splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Tree Shaking**: Dead code elimination
- **CSS Optimization**: CSS Nano minification
- **Compression**: Gzip compression enabled

### Performance Monitoring

```bash
# Check build size
pnpm build:size

# Compress build files
pnpm build:compress
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
