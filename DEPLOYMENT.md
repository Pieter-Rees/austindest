# Production Deployment Guide

## Pre-deployment Checklist

### 1. Code Quality

- [ ] All TypeScript errors resolved
- [ ] All tests passing
- [ ] Linting passes
- [ ] Code formatted with Prettier

### 2. Build Verification

```bash
# Run full validation
pnpm validate

# Or run individually
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

### 3. Production Build

```bash
# Clean previous builds
pnpm clean

# Build for production
pnpm build

# Verify build output
ls -la build/
```

## Deployment Options

### Static Hosting (Recommended)

This project is configured for static export and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

### Build Output

- Static files are generated in the `build/` directory
- No server-side rendering required
- All assets are optimized and compressed

## Environment Variables

Set these in your hosting platform:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Performance Optimizations

- ✅ Console logs removed in production
- ✅ Images optimized (WebP/AVIF support)
- ✅ Code minified and compressed
- ✅ Package imports optimized
- ✅ React Strict Mode enabled
- ✅ SWC minification enabled

## Monitoring

After deployment, monitor:

- Core Web Vitals
- Bundle size
- Loading performance
- Error rates

## Husky Hooks

The project includes pre-commit and pre-push hooks:

- **Pre-commit**: Runs linting, formatting, type checking, and tests
- **Pre-push**: Runs full test suite with coverage and build verification

## Troubleshooting

### Build Failures

1. Check TypeScript errors: `pnpm typecheck`
2. Check linting issues: `pnpm lint`
3. Check test failures: `pnpm test`
4. Clean and rebuild: `pnpm clean && pnpm build`

### Performance Issues

1. Analyze bundle: `pnpm build:analyze`
2. Check image optimization
3. Verify compression is enabled
4. Monitor Core Web Vitals
