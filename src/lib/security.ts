/**
 * Security configuration and utilities
 */

export const SECURITY_CONFIG = {
  // Content Security Policy configuration
  CSP: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'", // Required for Next.js
      'https://www.youtube.com',
      'https://www.spotify.com',
      'https://open.spotify.com',
      'https://w.soundcloud.com',
    ],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'media-src': [
      "'self'",
      'https://www.youtube.com',
      'https://www.spotify.com',
      'https://open.spotify.com',
      'https://w.soundcloud.com',
    ],
    'connect-src': [
      "'self'",
      'https://www.youtube.com',
      'https://www.spotify.com',
      'https://open.spotify.com',
      'https://w.soundcloud.com',
    ],
    'frame-src': [
      "'self'",
      'https://www.youtube.com',
      'https://www.spotify.com',
      'https://open.spotify.com',
      'https://w.soundcloud.com',
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  },

  // Security headers configuration
  HEADERS: {
    'X-DNS-Prefetch-Control': 'on',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  // Allowed domains for external resources
  ALLOWED_DOMAINS: [
    'www.youtube.com',
    'youtube.com',
    'www.spotify.com',
    'open.spotify.com',
    'w.soundcloud.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ],

  // Rate limiting configuration
  RATE_LIMITS: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  },
} as const;

/**
 * Generate Content Security Policy string
 */
export function generateCSP(): string {
  return Object.entries(SECURITY_CONFIG.CSP)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

/**
 * Validate external URL against allowed domains
 */
export function isAllowedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return SECURITY_CONFIG.ALLOWED_DOMAINS.some(
      domain =>
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
    'base64'
  );
}

/**
 * Security utilities for form validation
 */
export const SecurityUtils = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL format (only allows HTTP/HTTPS)
   */
  isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },

  /**
   * Check if string contains potentially malicious content
   */
  containsMaliciousContent(input: string): boolean {
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    return maliciousPatterns.some(pattern => pattern.test(input));
  },
} as const;
