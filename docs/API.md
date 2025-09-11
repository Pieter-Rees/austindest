# API Documentation

## Components

### UI Components

#### Title

A flexible title component with neon effects and multiple alignment options.

```tsx
import { Title } from "./ui";

<Title
  title="Austin"
  subtitle="All About The Groove"
  align="center"
  size="lg"
  margin={true}
/>;
```

**Props:**

- `title?: string` - Main title text
- `subtitle?: string` - Subtitle text
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Title size
- `margin?: boolean` - Add margin to subtitle
- `left?: boolean` - Legacy left alignment
- `right?: boolean` - Legacy right alignment
- `center?: boolean` - Legacy center alignment

#### VideoPlayer

A responsive video player component with React Player integration.

```tsx
import { VideoPlayer } from "./ui";

<VideoPlayer
  src="https://youtu.be/example"
  playing={true}
  loop={true}
  muted={true}
  width="100%"
  height="500px"
/>;
```

**Props:**

- `src: string` - Video URL
- `playing?: boolean` - Auto-play video
- `loop?: boolean` - Loop video
- `muted?: boolean` - Mute audio
- `light?: boolean | string` - Show thumbnail first
- `width?: string | number` - Player width
- `height?: string | number` - Player height
- `playbackRate?: number` - Playback speed
- `controls?: boolean` - Show controls

#### Button

A customizable button component with multiple variants.

```tsx
import { Button } from "./ui";

<Button variant="primary" size="lg" isLoading={false}>
  Click me
</Button>;
```

**Props:**

- `variant?: 'primary' | 'secondary' | 'ghost' | 'outline'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `isLoading?: boolean` - Show loading state

#### Container

A responsive container component with size variants.

```tsx
import { Container } from "./ui";

<Container size="lg" as="section">
  Content here
</Container>;
```

**Props:**

- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Container size
- `as?: ElementType` - HTML element type

## Utilities

### cn()

Utility function for combining class names with Tailwind CSS.

```tsx
import { cn } from "@/lib/utils";

const className = cn("base-class", condition && "conditional-class");
```

## Hooks

### useClientSide()

Hook to detect client-side rendering.

```tsx
import { useClientSide } from "@/hooks/useClientSide";

function Component() {
  const isClient = useClientSide();

  if (!isClient) return null;

  return <div>Client-only content</div>;
}
```

## Fonts

### monotonFont

Custom Monoton font configuration.

```tsx
import { monotonFont } from "@/lib/fonts";

<div className={monotonFont.className}>Neon text</div>;
```

### interFont

Inter font configuration for body text.

```tsx
import { interFont } from "@/lib/fonts";

<div className={interFont.className}>Body text</div>;
```

## Configuration

### Tailwind CSS

Custom color palette:

```typescript
colors: {
  bubblegum: "#ff77e9",
  blue: "rgba(0, 100, 200, 1)",
  midnight: "#121063",
  metal: "#565584",
  tahiti: "#3ab7bf",
  silver: "#ecebff",
  bermuda: "#78dcca",
  red: "rgba(255, 0, 0, 1)",
}
```

### Next.js

Optimized configuration for static export:

```javascript
const nextConfig = {
  output: "export",
  distDir: "build",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```
