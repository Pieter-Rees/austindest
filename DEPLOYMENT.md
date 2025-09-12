# Deployment Guide

This guide covers deploying the Press Kit AD application to various hosting platforms.

## 🚀 Quick Deploy

### Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Set in Vercel dashboard or via CLI
   - Required: `NEXT_PUBLIC_APP_URL`
   - Optional: Analytics IDs, monitoring DSNs

3. **Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `build`
   - Install Command: `pnpm install`

### Netlify

1. **Build Settings**

   ```yaml
   Build command: pnpm build
   Publish directory: build
   ```

2. **Environment Variables**
   - Add in Netlify dashboard
   - Same variables as Vercel

3. **Redirects** (netlify.toml)
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### GitHub Pages

1. **GitHub Actions**
   - Uses the included CI workflow
   - Automatically builds and deploys on push to main

2. **Repository Settings**
   - Enable GitHub Pages
   - Source: GitHub Actions

3. **Custom Domain** (optional)
   - Add CNAME file to public directory
   - Configure DNS settings

### AWS S3 + CloudFront

1. **Build and Upload**

   ```bash
   # Build the application
   pnpm build

   # Upload to S3
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

2. **CloudFront Configuration**
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 → /index.html (SPA routing)

3. **Environment Variables**
   - Set in CloudFront or Lambda@Edge

### Docker

1. **Dockerfile**

   ```dockerfile
   FROM node:20-alpine AS base

   # Install pnpm
   RUN npm install -g pnpm

   # Set working directory
   WORKDIR /app

   # Copy package files
   COPY package.json pnpm-lock.yaml ./

   # Install dependencies
   RUN pnpm install --frozen-lockfile

   # Copy source code
   COPY . .

   # Build application
   RUN pnpm build

   # Production stage
   FROM nginx:alpine
   COPY --from=base /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf

   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**

   ```bash
   # Build image
   docker build -t press-kit-ad .

   # Run container
   docker run -p 80:80 press-kit-ad
   ```

## 🔧 Environment Configuration

### Required Variables

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Press Kit AD"
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Performance Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://...

# Build Configuration
ANALYZE=false
TURBOPACK=false
```

## 📊 Performance Optimization

### Pre-deployment Checklist

- [ ] Run `pnpm validate` (all checks pass)
- [ ] Run `pnpm build` (successful build)
- [ ] Run `pnpm size` (check bundle size)
- [ ] Run `pnpm perf` (Lighthouse audit)
- [ ] Test on staging environment

### Performance Monitoring

1. **Lighthouse CI**

   ```bash
   # Run performance audit
   pnpm perf
   ```

2. **Bundle Analysis**

   ```bash
   # Analyze bundle size
   pnpm size
   ```

3. **Core Web Vitals**
   - Monitor LCP, FID, CLS
   - Set up alerts for regressions

## 🔒 Security Considerations

### Security Headers

The application includes security headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Additional Security

1. **HTTPS Only**
   - Ensure all traffic uses HTTPS
   - Set up HSTS headers

2. **Content Security Policy**
   - Add CSP headers for additional security
   - Test with CSP evaluator

3. **Dependency Security**

   ```bash
   # Audit dependencies
   pnpm audit

   # Fix vulnerabilities
   pnpm audit --fix
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clean and rebuild
   pnpm clean
   pnpm install
   pnpm build
   ```

2. **TypeScript Errors**

   ```bash
   # Check types
   pnpm typecheck
   ```

3. **Test Failures**

   ```bash
   # Run tests
   pnpm test

   # Debug specific test
   pnpm test:debug -- --testNamePattern="Test Name"
   ```

4. **Performance Issues**

   ```bash
   # Analyze bundle
   pnpm size

   # Profile build
   pnpm build:profile
   ```

### Debug Mode

```bash
# Enable debug logging
DEBUG=true pnpm dev

# Verbose output
VERBOSE=true pnpm build
```

## 📈 Monitoring and Analytics

### Application Monitoring

1. **Error Tracking**
   - Set up Sentry or similar service
   - Configure error boundaries

2. **Performance Monitoring**
   - Use Web Vitals library
   - Monitor Core Web Vitals

3. **Analytics**
   - Google Analytics 4
   - Google Tag Manager
   - Custom event tracking

### Health Checks

```bash
# Check application health
curl -f https://your-domain.com/api/health || exit 1
```

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow:

1. **Lint & Type Check**
2. **Test Suite**
3. **Build Application**
4. **Security Audit**
5. **Performance Test** (PR only)

### Custom Deployment

For custom deployment, modify `.github/workflows/ci.yml`:

```yaml
# Add deployment step
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  run: |
    # Your deployment commands
    echo "Deploying to production..."
```

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS S3 Static Website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

---

For questions or issues, please open a GitHub issue.
