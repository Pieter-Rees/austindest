import { NextResponse, type NextRequest } from 'next/server';

/**
 * Security middleware for additional protection
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers (additional to Next.js config)
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  // Block suspicious requests
  const userAgent = request.headers.get('user-agent') ?? '';
  const suspiciousPatterns = [/bot/i, /crawler/i, /spider/i, /scraper/i];

  // Allow legitimate bots but block suspicious ones
  const isSuspiciousBot = suspiciousPatterns.some(
    pattern => pattern.test(userAgent) && !isLegitimateBot(userAgent)
  );

  if (isSuspiciousBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Rate limiting headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', '99');
  response.headers.set(
    'X-RateLimit-Reset',
    new Date(Date.now() + 15 * 60 * 1000).toISOString()
  );

  // Security headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
  }

  return response;
}

/**
 * Check if bot is legitimate (search engines, etc.)
 */
function isLegitimateBot(userAgent: string): boolean {
  const legitimateBots = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
  ];

  return legitimateBots.some(bot => userAgent.toLowerCase().includes(bot));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
