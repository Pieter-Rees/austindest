import {
  generateCSP,
  isAllowedDomain,
  sanitizeInput,
  generateNonce,
  SecurityUtils,
} from '@/lib/security';

describe('Security Utils', () => {
  describe('generateCSP', () => {
    it('generates valid CSP string', () => {
      const csp = generateCSP();

      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");
    });

    it('includes all required directives', () => {
      const csp = generateCSP();
      const directives = [
        'default-src',
        'script-src',
        'style-src',
        'font-src',
        'img-src',
        'media-src',
        'connect-src',
        'frame-src',
        'object-src',
        'base-uri',
        'form-action',
        'frame-ancestors',
      ];

      directives.forEach(directive => {
        expect(csp).toContain(directive);
      });
    });
  });

  describe('isAllowedDomain', () => {
    it('allows YouTube domains', () => {
      expect(isAllowedDomain('https://www.youtube.com/embed/123')).toBe(true);
      expect(isAllowedDomain('https://youtube.com/watch?v=123')).toBe(true);
    });

    it('allows Spotify domains', () => {
      expect(isAllowedDomain('https://www.spotify.com/embed/123')).toBe(true);
      expect(isAllowedDomain('https://open.spotify.com/track/123')).toBe(true);
    });

    it('allows SoundCloud domains', () => {
      expect(isAllowedDomain('https://w.soundcloud.com/player/123')).toBe(true);
    });

    it('allows Google Fonts domains', () => {
      expect(isAllowedDomain('https://fonts.googleapis.com/css2')).toBe(true);
      expect(isAllowedDomain('https://fonts.gstatic.com/s/roboto/v1')).toBe(
        true
      );
    });

    it('rejects unknown domains', () => {
      expect(isAllowedDomain('https://malicious-site.com')).toBe(false);
      expect(isAllowedDomain('https://evil.com/steal-data')).toBe(false);
    });

    it('handles invalid URLs', () => {
      expect(isAllowedDomain('not-a-url')).toBe(false);
      expect(isAllowedDomain('')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        'alert("xss")'
      );
      expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
    });

    it('removes javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")');
      expect(sanitizeInput('JAVASCRIPT:alert("xss")')).toBe('alert("xss")');
    });

    it('removes event handlers', () => {
      expect(sanitizeInput('onclick="alert(1)"')).toBe('"alert(1)"');
      expect(sanitizeInput('onload="malicious()"')).toBe('"malicious()"');
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('handles empty input', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });

  describe('generateNonce', () => {
    it('generates a nonce string', () => {
      const nonce = generateNonce();
      expect(typeof nonce).toBe('string');
      expect(nonce.length).toBeGreaterThan(0);
    });

    it('generates different nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toBe(nonce2);
    });
  });

  describe('SecurityUtils', () => {
    describe('isValidEmail', () => {
      it('validates correct email formats', () => {
        expect(SecurityUtils.isValidEmail('test@example.com')).toBe(true);
        expect(SecurityUtils.isValidEmail('user.name@domain.co.uk')).toBe(true);
        expect(SecurityUtils.isValidEmail('test+tag@example.org')).toBe(true);
      });

      it('rejects invalid email formats', () => {
        expect(SecurityUtils.isValidEmail('not-an-email')).toBe(false);
        expect(SecurityUtils.isValidEmail('@example.com')).toBe(false);
        expect(SecurityUtils.isValidEmail('test@')).toBe(false);
        expect(SecurityUtils.isValidEmail('')).toBe(false);
      });
    });

    describe('isValidUrl', () => {
      it('validates correct URL formats', () => {
        expect(SecurityUtils.isValidUrl('https://example.com')).toBe(true);
        expect(SecurityUtils.isValidUrl('http://localhost:3000')).toBe(true);
        expect(SecurityUtils.isValidUrl('https://sub.domain.com/path')).toBe(
          true
        );
      });

      it('rejects invalid URL formats', () => {
        expect(SecurityUtils.isValidUrl('not-a-url')).toBe(false);
        expect(SecurityUtils.isValidUrl('ftp://example.com')).toBe(false);
        expect(SecurityUtils.isValidUrl('')).toBe(false);
      });
    });

    describe('containsMaliciousContent', () => {
      it('detects script tags', () => {
        expect(
          SecurityUtils.containsMaliciousContent(
            '<script>alert("xss")</script>'
          )
        ).toBe(true);
        expect(
          SecurityUtils.containsMaliciousContent(
            '<SCRIPT>alert("xss")</SCRIPT>'
          )
        ).toBe(true);
      });

      it('detects javascript: protocol', () => {
        expect(
          SecurityUtils.containsMaliciousContent('javascript:alert("xss")')
        ).toBe(true);
        expect(
          SecurityUtils.containsMaliciousContent('JAVASCRIPT:alert("xss")')
        ).toBe(true);
      });

      it('detects event handlers', () => {
        expect(
          SecurityUtils.containsMaliciousContent('onclick="alert(1)"')
        ).toBe(true);
        expect(
          SecurityUtils.containsMaliciousContent('onload="malicious()"')
        ).toBe(true);
      });

      it('detects iframe tags', () => {
        expect(
          SecurityUtils.containsMaliciousContent('<iframe src="evil.com">')
        ).toBe(true);
        expect(
          SecurityUtils.containsMaliciousContent('<IFRAME src="evil.com">')
        ).toBe(true);
      });

      it('detects object tags', () => {
        expect(
          SecurityUtils.containsMaliciousContent('<object data="evil.swf">')
        ).toBe(true);
      });

      it('detects embed tags', () => {
        expect(
          SecurityUtils.containsMaliciousContent('<embed src="evil.swf">')
        ).toBe(true);
      });

      it('allows safe content', () => {
        expect(SecurityUtils.containsMaliciousContent('Hello world')).toBe(
          false
        );
        expect(
          SecurityUtils.containsMaliciousContent('This is safe text')
        ).toBe(false);
        expect(
          SecurityUtils.containsMaliciousContent('https://example.com')
        ).toBe(false);
      });
    });
  });
});
