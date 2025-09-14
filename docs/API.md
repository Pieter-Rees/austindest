# API Documentation

This document provides comprehensive API documentation for the Press Kit AD project.

## 📋 Table of Contents

- [Components](#components)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Types](#types)
- [Configuration](#configuration)

## 🧩 Components

### UI Components

#### `ErrorBoundary`

Error boundary component for catching JavaScript errors in React components.

```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <YourComponent />
</ErrorBoundary>;
```

**Props:**

- `fallback?: React.ReactNode` - Fallback UI to display when an error occurs
- `onError?: (error: Error, errorInfo: ErrorInfo) => void` - Error handler callback

#### `OptimizedImage`

Optimized image component with loading states and error handling.

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src='/path/to/image.jpg'
  alt='Description'
  width={800}
  height={600}
  priority={false}
  quality={85}
  placeholder='blur'
  blurDataURL='data:image/jpeg;base64,...'
/>;
```

**Props:**

- `src: string` - Image source URL
- `alt: string` - Alt text for accessibility
- `width: number` - Image width
- `height: number` - Image height
- `priority?: boolean` - Whether to prioritize loading
- `quality?: number` - Image quality (1-100)
- `placeholder?: 'blur' | 'empty'` - Placeholder type
- `blurDataURL?: string` - Blur placeholder data URL
- `sizes?: string` - Responsive image sizes
- `loading?: 'lazy' | 'eager'` - Loading behavior
- `fetchPriority?: 'auto' | 'high' | 'low'` - Fetch priority
- `onLoad?: () => void` - Load event handler
- `onError?: () => void` - Error event handler

#### `SkeletonLoader`

Loading skeleton component for better UX during content loading.

```tsx
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

<SkeletonLoader
  variant='rectangular'
  width={200}
  height={100}
  animation='pulse'
/>;
```

**Props:**

- `variant?: 'text' | 'rectangular' | 'circular' | 'image'` - Skeleton variant
- `width?: number | string` - Skeleton width
- `height?: number | string` - Skeleton height
- `lines?: number` - Number of lines for text variant
- `animation?: 'pulse' | 'wave' | 'none'` - Animation type
- `className?: string` - Additional CSS classes

#### `VirtualList`

Virtual scrolling component for efficient rendering of large lists.

```tsx
import { VirtualList } from '@/components/ui/VirtualList';

<VirtualList
  items={largeArray}
  itemHeight={50}
  containerHeight={400}
  renderItem={({ item, index }) => <div key={index}>{item.name}</div>}
/>;
```

**Props:**

- `items: T[]` - Array of items to render
- `itemHeight: number` - Height of each item in pixels
- `containerHeight: number` - Height of the container
- `renderItem: (props: { item: T; index: number }) => React.ReactNode` - Item renderer
- `overscan?: number` - Number of items to render outside viewport
- `className?: string` - Additional CSS classes

#### `PerformanceMonitor`

Development performance monitoring component.

```tsx
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';

<PerformanceMonitor showInProduction={false} position='bottom-right' />;
```

**Props:**

- `showInProduction?: boolean` - Whether to show in production
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` - Position on screen

### Feature Components

#### `LandingBg`

Landing page background component with video support.

```tsx
import LandingBg from '@/components/features/landingBg';

<LandingBg />;
```

#### `Watch`

Watch component for video playback.

```tsx
import Watch from '@/components/features/watch';

<Watch />;
```

## 🪝 Hooks

### `useDebounce`

Hook for debouncing values and callbacks.

```tsx
import {
  useDebounce,
  useDebouncedCallback,
  useThrottle,
} from '@/hooks/useDebounce';

// Debounce a value
const debouncedValue = useDebounce(value, 500);

// Debounce a callback
const debouncedCallback = useDebouncedCallback(value => {
  console.log(value);
}, 500);

// Throttle a callback
const throttledCallback = useThrottle(value => {
  console.log(value);
}, 500);
```

### `useMemo`

Advanced memoization hooks for performance optimization.

```tsx
import { useStableMemo, useDeepMemo, useStableCallback } from '@/hooks/useMemo';

// Stable memoization
const memoizedValue = useStableMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Deep memoization
const deepMemoizedValue = useDeepMemo(() => {
  return complexObject(data);
}, [data]);

// Stable callback
const stableCallback = useStableCallback(value => {
  console.log(value);
});
```

### `usePerformance`

Hook for tracking Core Web Vitals and performance metrics.

```tsx
import { usePerformance } from '@/hooks/usePerformance';

const performance = usePerformance();

// Access metrics
console.log(performance.metrics.lcp); // Largest Contentful Paint
console.log(performance.metrics.fid); // First Input Delay
console.log(performance.metrics.cls); // Cumulative Layout Shift

// Get performance score
const score = performance.getPerformanceScore(); // 'good' | 'needs-improvement' | 'poor'

// Log metrics
performance.logPerformanceMetrics();
```

### `useScroll`

Hook for tracking scroll position and state.

```tsx
import { useScroll } from '@/hooks/useScroll';

const scroll = useScroll();

console.log(scroll.scrollY); // Current scroll position
console.log(scroll.direction); // 'up' | 'down' | 'idle'
console.log(scroll.velocity); // Scroll velocity
console.log(scroll.isAtTop); // Whether at top
console.log(scroll.isAtBottom); // Whether at bottom
```

## 🛠️ Utilities

### Security Utilities

#### `generateCSP`

Generate Content Security Policy header.

```tsx
import { generateCSP } from '@/lib/security';

const csp = generateCSP({
  allowInline: false,
  allowEval: false,
  allowedDomains: ['example.com'],
});
```

#### `sanitizeInput`

Sanitize user input to prevent XSS attacks.

```tsx
import { sanitizeInput } from '@/lib/security';

const cleanInput = sanitizeInput(userInput);
```

#### `isValidEmail`

Validate email addresses.

```tsx
import { SecurityUtils } from '@/lib/security';

const isValid = SecurityUtils.isValidEmail('user@example.com');
```

#### `isValidUrl`

Validate URLs.

```tsx
import { SecurityUtils } from '@/lib/security';

const isValid = SecurityUtils.isValidUrl('https://example.com');
```

## 📝 Types

### Performance Types

```typescript
interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  navigation?: PerformanceNavigationTiming;
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  isSupported: boolean;
  connection?: Record<string, unknown>;
}
```

### Security Types

```typescript
interface SecurityConfig {
  headers: Record<string, string>;
  allowedDomains: string[];
  rateLimits: {
    windowMs: number;
    maxRequests: number;
  };
}
```

## ⚙️ Configuration

### Next.js Configuration

The project uses a comprehensive Next.js configuration with:

- **Bundle Analysis**: `@next/bundle-analyzer` for bundle size analysis
- **Security Headers**: Comprehensive security headers
- **Performance Optimizations**: SWC compilation, code splitting
- **Image Optimization**: Next.js Image with WebP/AVIF support

### TypeScript Configuration

Strict TypeScript configuration with:

- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`

### ESLint Configuration

Modern ESLint configuration with:

- Next.js recommended rules
- TypeScript-specific rules
- Import organization
- Accessibility rules
- React best practices

## 🚀 Usage Examples

### Basic Component Usage

```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { usePerformance } from '@/hooks/usePerformance';

function MyComponent() {
  const performance = usePerformance();

  return (
    <ErrorBoundary>
      <OptimizedImage
        src='/hero-image.jpg'
        alt='Hero image'
        width={1200}
        height={600}
        priority
      />
      <div>Performance Score: {performance.getPerformanceScore()}</div>
    </ErrorBoundary>
  );
}
```

### Advanced Performance Monitoring

```tsx
import { usePerformance } from '@/hooks/usePerformance';
import { useScroll } from '@/hooks/useScroll';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';

function App() {
  const performance = usePerformance();
  const scroll = useScroll();

  useEffect(() => {
    // Log performance metrics on scroll
    if (scroll.scrollY > 1000) {
      performance.logPerformanceMetrics();
    }
  }, [scroll.scrollY, performance]);

  return (
    <div>
      <YourContent />
      <PerformanceMonitor position='bottom-right' />
    </div>
  );
}
```

### Security Implementation

```tsx
import { sanitizeInput, SecurityUtils } from '@/lib/security';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate and sanitize inputs
    if (!SecurityUtils.isValidEmail(email)) {
      alert('Invalid email address');
      return;
    }

    const sanitizedMessage = sanitizeInput(message);

    // Submit form with sanitized data
    submitForm({ email, message: sanitizedMessage });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
```

---

For more detailed information, see the [README.md](../README.md) and [SECURITY.md](../SECURITY.md) files.
