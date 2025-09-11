# Austin Dest Website

A modern, high-performance website for Austin Dest - DJ, Producer, and Musician. Built with Next.js 15 and React 19, featuring a clean design, PWA capabilities, and comprehensive testing.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Performance Optimized**: Static export, image optimization, code splitting
- **PWA Ready**: Service worker, offline capabilities, installable
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with proper focus management
- **SEO Optimized**: Structured data, meta tags, sitemap
- **Analytics**: Performance monitoring and user tracking
- **Testing**: 100% test coverage with Jest and Testing Library

## 🛠️ Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

### State Management

- **Zustand** - Lightweight state management

### UI & Animation

- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible component primitives

### Development

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Testing Library** - Component testing utilities

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # App-specific components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── analytics/          # Performance monitoring
│   ├── pwa/               # PWA features
│   ├── seo/               # SEO components
│   ├── ui/                # UI components
│   └── *.tsx              # Page components
├── constants/             # Application constants
├── lib/                   # Utilities and stores
└── types/                 # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development Commands

```bash
# Linting and formatting
pnpm lint              # Run ESLint
pnpm lint:fix          # Fix ESLint issues
pnpm format            # Format code with Prettier
pnpm format:check      # Check formatting

# Type checking
pnpm typecheck         # Run TypeScript compiler

# Testing
pnpm test              # Run tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage
pnpm test:ci           # Run tests for CI

# Quality checks
pnpm check             # Run all checks (typecheck + lint + format)
pnpm fix               # Fix all fixable issues

# Build and deployment
pnpm build             # Build for production
pnpm preview           # Preview production build
pnpm clean             # Clean build artifacts
```

## 🧪 Testing

The project maintains 100% test coverage across all components and utilities:

- **Unit Tests**: Component behavior and utility functions
- **Integration Tests**: Component interactions
- **Accessibility Tests**: WCAG compliance
- **Performance Tests**: Bundle size and runtime performance

### Test Structure

```
src/
├── __tests__/          # Test utilities
├── app/__tests__/      # App component tests
└── components/__tests__/ # Component tests
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Update snapshots
pnpm test:update
```

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom design system:

- **CSS Variables**: Dynamic theming support
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme detection
- **Custom Animations**: Smooth transitions and effects
- **Accessibility**: Focus management and screen reader support

## 📱 PWA Features

- **Service Worker**: Offline functionality
- **Web App Manifest**: Installable on devices
- **Caching Strategy**: Optimized for performance
- **Update Notifications**: User-friendly updates

## 🔍 SEO & Analytics

- **Structured Data**: Rich snippets for search engines
- **Meta Tags**: Optimized for social sharing
- **Performance Monitoring**: Real-time performance tracking
- **Accessibility**: WCAG 2.1 AA compliance

## 🚀 Deployment

The project is configured for static export and can be deployed to any static hosting service:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Build Configuration

- **Static Export**: Optimized for CDN deployment
- **Image Optimization**: WebP/AVIF support
- **Code Splitting**: Optimized bundle sizes
- **Tree Shaking**: Dead code elimination

## 📊 Performance

- **First Load JS**: 269 kB
- **Lighthouse Score**: 100/100
- **Core Web Vitals**: All green
- **Bundle Analysis**: Optimized dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and checks
5. Submit a pull request

### Code Standards

- **ESLint**: Enforced code quality
- **Prettier**: Consistent formatting
- **TypeScript**: Type safety
- **Testing**: 100% coverage required

## 📄 License

UNLICENSED - All rights reserved

## 👨‍💻 Author

**Pieter Rees** - Developer and maintainer

---

Built with ❤️ using Next.js 15 and modern web technologies.
