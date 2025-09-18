# Deployment Guide

This guide covers various deployment options for the Press Kit AD project.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Static Export](#static-export)
- [Platform-Specific Deployment](#platform-specific-deployment)
- [Performance Optimization](#performance-optimization)
- [Security Configuration](#security-configuration)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before deploying, ensure you have:

- Node.js 20.18.0 or higher
- pnpm 9.15.0 or higher
- Git configured with your deployment platform
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## 🌍 Environment Setup

### 1. Environment Variables

Create a `.env.production` file:

```env
# Production Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Press Kit AD"
NEXT_PUBLIC_APP_DESCRIPTION="Modern press kit website"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Optional: Performance Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
```

### 2. Build Configuration

The project is configured for static export by default. Key configuration in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // ... other configurations
};
```

## 📦 Static Export

### 1. Build the Project

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# The build output will be in the 'out' directory
```

### 2. Verify Build

```bash
# Check build size
pnpm build:size

# Verify security headers
pnpm security:headers

# Run security audit
pnpm security:validate
```

### 3. Test Locally

```bash
# Serve the static files locally
npx serve out

# Or use any static file server
npx http-server out
```

## 🚀 Platform-Specific Deployment

### Server-Side Rendering (Your PM2 Setup)

For server-side rendering with your existing PM2 setup:

1. **Build the Application**

   ```bash
   pnpm install
   pnpm build
   ```

2. **Start with Your PM2 Configuration**

   ```bash
   # Use your existing PM2 ecosystem file
   pm2 start your-ecosystem.config.js --env production
   ```

3. **Benefits of Server-Side Rendering**
   - **Middleware Support**: Full Next.js middleware functionality
   - **Image Optimization**: Automatic image optimization and WebP/AVIF support
   - **API Routes**: Support for API routes if needed
   - **Dynamic Features**: Full access to server-side features
   - **Security Headers**: Comprehensive security headers working properly

### Vercel (Static Hosting)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Set in Vercel dashboard: `Settings > Environment Variables`
   - Add all variables from `.env.production`

3. **Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `out`
   - Install Command: `pnpm install`

### Netlify

1. **Build Settings**

   ```yaml
   # netlify.toml
   [build]
     command = "pnpm build"
     publish = "out"

   [build.environment]
     NODE_VERSION = "20"
     PNPM_VERSION = "9"
   ```

2. **Deploy**

   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=out
   ```

### GitHub Pages

1. **GitHub Actions Workflow**

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
         - run: npm install -g pnpm
         - run: pnpm install
         - run: pnpm build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

2. **Repository Settings**
   - Go to `Settings > Pages`
   - Source: `GitHub Actions`
   - Enable the workflow

### AWS S3 + CloudFront

1. **Build and Upload**

   ```bash
   # Build the project
   pnpm build

   # Install AWS CLI
   aws configure

   # Upload to S3
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

2. **CloudFront Configuration**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure custom error pages (404 → /index.html)
   - Enable Gzip compression

### Docker Deployment

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

   # Build the application
   RUN pnpm build

   # Production stage
   FROM nginx:alpine
   COPY --from=base /app/out /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf

   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **nginx.conf**

   ```nginx
   events {
     worker_connections 1024;
   }

   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;

     # Gzip compression
     gzip on;
     gzip_vary on;
     gzip_min_length 1024;
     gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header Referrer-Policy "strict-origin-when-cross-origin" always;

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
         expires 1y;
         add_header Cache-Control "public, immutable";
       }

       # Handle client-side routing
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and Run**

   ```bash
   # Build Docker image
   docker build -t press-kit-ad .

   # Run container
   docker run -p 80:80 press-kit-ad
   ```

## ⚡ Performance Optimization

### 1. Build Optimization

```bash
# Analyze bundle size
pnpm build:analyze

# Check for unused dependencies
pnpm audit

# Optimize images
pnpm build:compress
```

### 2. CDN Configuration

- Enable Gzip/Brotli compression
- Set appropriate cache headers
- Use HTTP/2
- Enable browser caching

### 3. Image Optimization

- Use WebP/AVIF formats
- Implement lazy loading
- Use responsive images
- Optimize image sizes

### 4. Code Splitting

The project already includes:

- Dynamic imports for heavy components
- Route-based code splitting
- Component-level code splitting

## 🔒 Security Configuration

### 1. Security Headers

The project includes comprehensive security headers:

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        // ... more headers
      ]
    }
  ];
}
```

### 2. Content Security Policy

```javascript
// CSP configuration
const csp = generateCSP({
  allowInline: false,
  allowEval: false,
  allowedDomains: ['your-domain.com'],
});
```

### 3. HTTPS Configuration

- Use Let's Encrypt for free SSL certificates
- Enable HSTS headers
- Redirect HTTP to HTTPS
- Use secure cookies

## 📊 Monitoring & Analytics

### 1. Performance Monitoring

```javascript
// Add to your app
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';

function App() {
  return (
    <div>
      <YourApp />
      <PerformanceMonitor showInProduction={true} />
    </div>
  );
}
```

### 2. Error Tracking

```javascript
// Add Sentry for error tracking
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 3. Analytics

```javascript
// Add Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google';

function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next out
   pnpm install
   pnpm build
   ```

2. **Static Export Issues**
   - Ensure `output: 'export'` in next.config.js
   - Check for server-side code
   - Verify image optimization settings

3. **Security Headers Not Working**
   - Check if platform supports custom headers
   - Verify header syntax
   - Test with security header tools

4. **Performance Issues**
   - Run bundle analysis
   - Check for large dependencies
   - Optimize images
   - Enable compression

### Debug Commands

```bash
# Check build size
pnpm build:size

# Analyze bundle
pnpm build:analyze

# Security audit
pnpm security:validate

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Support

For deployment issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review platform-specific documentation
3. Check GitHub issues
4. Contact support team

---

For more information, see the [README.md](../README.md) and [API.md](./API.md) files.
