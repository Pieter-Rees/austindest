# Production Deployment Guide

This guide covers deploying the Austin Dest press kit to production with all optimizations and security measures in place.

## Prerequisites

- Node.js 20+
- pnpm (latest version)
- Production hosting environment (Vercel, Netlify, AWS, etc.)

## Quick Start

### 1. Production Build

```bash
# Run the complete production build process
pnpm production

# Or step by step:
pnpm build:clean    # Clean previous builds
pnpm install        # Install dependencies
pnpm typecheck      # Type checking
pnpm lint           # Code quality
pnpm test:ci        # Run tests
pnpm build          # Build for production
```

### 2. Local Production Testing

```bash
# Test the production build locally
pnpm start:prod
```

### 3. Deploy

```bash
# Deploy to your hosting platform
pnpm deploy
```

## Production Features

### ✅ Code Quality

- TypeScript strict mode
- ESLint with strict rules
- Prettier code formatting
- 100% test coverage (81.11% branch coverage)

### ✅ Performance Optimizations

- Next.js 15 with App Router
- Image optimization (WebP, AVIF)
- Code splitting and lazy loading
- Bundle analysis and compression
- SWC minification
- Tree shaking
- Static asset optimization

### ✅ Security

- Comprehensive security headers
- Content Security Policy (CSP)
- XSS protection
- CSRF protection
- Rate limiting
- Bot protection
- Input sanitization

### ✅ Monitoring

- Performance monitoring
- Error tracking
- Security audit
- Build validation

## Environment Variables

Create a `.env.production` file with:

```env
NODE_ENV=production
NEXT_PUBLIC_NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_CACHE_TTL=31536000
```

## Build Scripts

| Script                | Description                      |
| --------------------- | -------------------------------- |
| `pnpm production`     | Complete production build        |
| `pnpm build:prod`     | Production build with all checks |
| `pnpm build:analyze`  | Build with bundle analysis       |
| `pnpm build:compress` | Compress static assets           |
| `pnpm build:size`     | Analyze build size               |
| `pnpm build:clean`    | Clean build artifacts            |

## Quality Scripts

| Script              | Description               |
| ------------------- | ------------------------- |
| `pnpm validate`     | Full validation pipeline  |
| `pnpm typecheck`    | TypeScript checking       |
| `pnpm lint`         | ESLint code quality       |
| `pnpm format:check` | Prettier formatting check |
| `pnpm test:ci`      | CI test suite             |

## Security Scripts

| Script                   | Description                 |
| ------------------------ | --------------------------- |
| `pnpm security:validate` | Full security validation    |
| `pnpm audit`             | Dependency security audit   |
| `pnpm security:headers`  | Security headers validation |

## Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set build command: `pnpm production`
3. Set output directory: `.next`
4. Deploy automatically on push

### Netlify

1. Set build command: `pnpm production`
2. Set publish directory: `.next`
3. Add environment variables in Netlify dashboard

### AWS Amplify

1. Set build command: `pnpm production`
2. Set base directory: `.next`
3. Configure environment variables

### Docker

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm production

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
RUN npm install -g pnpm && pnpm install --prod
EXPOSE 3000
CMD ["pnpm", "start:prod"]
```

## Performance Monitoring

The application includes built-in performance monitoring:

- Core Web Vitals tracking
- Performance metrics collection
- Real-time performance scoring
- Connection quality monitoring

## Security Headers

The application includes comprehensive security headers:

- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Referrer-Policy
- Permissions-Policy

## Troubleshooting

### Build Failures

1. Check Node.js version (20+ required)
2. Clear cache: `pnpm build:clean`
3. Reinstall dependencies: `rm -rf node_modules && pnpm install`
4. Check for TypeScript errors: `pnpm typecheck`

### Performance Issues

1. Run bundle analysis: `pnpm build:analyze`
2. Check build size: `pnpm build:size`
3. Optimize images and assets
4. Review code splitting configuration

### Security Issues

1. Run security audit: `pnpm audit`
2. Check security headers: `pnpm security:headers`
3. Review CSP configuration
4. Update dependencies: `pnpm audit:fix`

## Support

For issues or questions:

1. Check the logs: `pnpm start:prod`
2. Run validation: `pnpm validate`
3. Review the build output
4. Check the security audit results

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Run security audits weekly
- Monitor performance metrics
- Review and update security headers
- Test production builds before deployment

### Monitoring

- Set up error tracking (Sentry, etc.)
- Monitor Core Web Vitals
- Track build performance
- Monitor security headers compliance
