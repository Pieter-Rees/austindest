import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

// Mock NextRequest and NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url) => ({
    url,
    headers: {
      get: jest.fn(),
      set: jest.fn(),
    },
    nextUrl: {
      pathname: new URL(url).pathname,
    },
  })),
  NextResponse: Object.assign(
    jest.fn().mockImplementation((body, init) => ({
      body,
      status: init?.status || 200,
      headers: {
        set: jest.fn(),
      },
    })),
    {
      next: jest.fn(() => ({
        headers: {
          set: jest.fn(),
        },
      })),
    }
  ),
}));

describe('middleware', () => {
  let mockResponse: any;
  let mockHeaders: any;
  let mockRequest: any;

  beforeEach(() => {
    mockHeaders = {
      set: jest.fn(),
    };
    mockResponse = {
      headers: mockHeaders,
    };
    (NextResponse.next as jest.Mock).mockReturnValue(mockResponse);

    // Create a mock request
    mockRequest = {
      headers: {
        get: jest.fn(),
        set: jest.fn(),
      },
      nextUrl: {
        pathname: '/',
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set security headers for all requests', () => {
    mockRequest.headers.get.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    mockRequest.nextUrl.pathname = '/';

    middleware(mockRequest);

    expect(mockHeaders.set).toHaveBeenCalledWith('X-Robots-Tag', 'index, follow');
    expect(mockHeaders.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=31536000, immutable');
    expect(mockHeaders.set).toHaveBeenCalledWith('X-RateLimit-Limit', '100');
    expect(mockHeaders.set).toHaveBeenCalledWith('X-RateLimit-Remaining', '99');
    expect(mockHeaders.set).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(String));
  });

  it('should set additional security headers for API routes', () => {
    mockRequest.headers.get.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    mockRequest.nextUrl.pathname = '/api/test';

    middleware(mockRequest);

    expect(mockHeaders.set).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    expect(mockHeaders.set).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
    expect(mockHeaders.set).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
  });

  it('should not set API security headers for non-API routes', () => {
    mockRequest.headers.get.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    mockRequest.nextUrl.pathname = '/';

    middleware(mockRequest);

    expect(mockHeaders.set).not.toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    expect(mockHeaders.set).not.toHaveBeenCalledWith('X-Frame-Options', 'DENY');
    expect(mockHeaders.set).not.toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
  });

  it('should allow legitimate bots', () => {
    const legitimateBots = [
      'Googlebot/2.1 (+http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      'Mozilla/5.0 (compatible; Slurp/cat; +http://www.ask.com/docs/help/webmasters.htm#crawl)',
      'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
      'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
      'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Twitterbot/1.0',
      'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com/crawler)',
      'WhatsApp/2.19.81 A',
      'TelegramBot (like TwitterBot)',
    ];

    legitimateBots.forEach(userAgent => {
      mockRequest.headers.get.mockReturnValue(userAgent);
      mockRequest.nextUrl.pathname = '/';

      const result = middleware(mockRequest);

      expect(result).toBe(mockResponse);
    });
  });

  it('should block suspicious bots', () => {
    const suspiciousBots = [
      'BadBot/1.0',
      'EvilCrawler/2.0',
      'MaliciousSpider/1.0',
      'DataScraper/1.0',
      'UnknownBot/1.0',
    ];

    suspiciousBots.forEach(userAgent => {
      mockRequest.headers.get.mockReturnValue(userAgent);
      mockRequest.nextUrl.pathname = '/';

      const result = middleware(mockRequest);

      expect(result.status).toBe(403);
      expect(result.body).toBe('Access Denied');
    });
  });

  it('should handle requests without user-agent header', () => {
    mockRequest.headers.get.mockReturnValue(null);
    mockRequest.nextUrl.pathname = '/';

    const result = middleware(mockRequest);

    expect(result).toBe(mockResponse);
  });

  it('should handle empty user-agent string', () => {
    mockRequest.headers.get.mockReturnValue('');
    mockRequest.nextUrl.pathname = '/';

    const result = middleware(mockRequest);

    expect(result).toBe(mockResponse);
  });

  it('should set rate limit reset time correctly', () => {
    mockRequest.headers.get.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    mockRequest.nextUrl.pathname = '/';

    const beforeTime = Date.now();
    middleware(mockRequest);
    const afterTime = Date.now();

    expect(mockHeaders.set).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(String));

    const resetTime = new Date(mockHeaders.set.mock.calls.find(call => call[0] === 'X-RateLimit-Reset')[1]).getTime();
    const expectedMinTime = beforeTime + 15 * 60 * 1000;
    const expectedMaxTime = afterTime + 15 * 60 * 1000;

    expect(resetTime).toBeGreaterThanOrEqual(expectedMinTime);
    expect(resetTime).toBeLessThanOrEqual(expectedMaxTime);
  });

  it('should handle mixed case user agents', () => {
    mockRequest.headers.get.mockReturnValue('GOOGLEBOT/2.1');
    mockRequest.nextUrl.pathname = '/';

    const result = middleware(mockRequest);

    expect(result).toBe(mockResponse);
  });

  it('should handle user agents with legitimate bots in the middle', () => {
    mockRequest.headers.get.mockReturnValue('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
    mockRequest.nextUrl.pathname = '/';

    const result = middleware(mockRequest);

    expect(result).toBe(mockResponse);
  });
});
