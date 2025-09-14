# Security Documentation

This document outlines the security measures implemented in the Austin Dest press kit application.

## Security Headers

The application implements comprehensive security headers to protect against common web vulnerabilities:

### Content Security Policy (CSP)

- **default-src**: Restricts all resources to same origin
- **script-src**: Allows scripts from self, inline scripts (required for Next.js), and trusted domains (YouTube, Spotify, SoundCloud)
- **style-src**: Allows styles from self, inline styles, and Google Fonts
- **img-src**: Allows images from self, data URIs, and HTTPS sources
- **frame-src**: Restricts frames to self and trusted media domains
- **object-src**: Blocks all object/embed elements
- **frame-ancestors**: Prevents embedding in frames

### Additional Security Headers

- **X-Frame-Options**: DENY - Prevents clickjacking attacks
- **X-Content-Type-Options**: nosniff - Prevents MIME type sniffing
- **X-XSS-Protection**: 1; mode=block - Enables XSS filtering
- **Strict-Transport-Security**: Enforces HTTPS with preload
- **Referrer-Policy**: origin-when-cross-origin - Controls referrer information
- **Permissions-Policy**: Restricts browser features (camera, microphone, etc.)

## Input Validation and Sanitization

### Client-Side Validation

- Email format validation using regex patterns
- URL format validation
- Malicious content detection (XSS prevention)

### Input Sanitization

- HTML tag removal
- JavaScript protocol removal
- Event handler removal
- Whitespace trimming

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP per window
- **Headers**: Standard rate limiting headers included

## Bot Protection

The middleware includes bot detection and filtering:

- **Allowed Bots**: Search engines (Google, Bing, etc.) and social media crawlers
- **Blocked Bots**: Suspicious scrapers and malicious bots
- **User Agent Analysis**: Pattern matching for bot identification

## Error Handling and Logging

### Development Mode

- Full error details logged to console
- Stack traces included for debugging

### Production Mode

- Sanitized error logging
- No sensitive data exposure
- Error details sent to monitoring service (configurable)
- Limited stack trace information

## External Resource Security

### Allowed Domains

- **YouTube**: www.youtube.com (for video embeds)
- **Spotify**: www.spotify.com (for music embeds)
- **SoundCloud**: w.soundcloud.com (for audio embeds)
- **Google Fonts**: fonts.googleapis.com, fonts.gstatic.com

### Domain Validation

- All external URLs validated against allowed domains
- Automatic rejection of unknown domains
- HTTPS enforcement for external resources

## Build Security

### Production Optimizations

- Source maps disabled in production
- Console logs removed (except errors/warnings)
- Test attributes removed from production builds
- Powered-by header removed

### Dependencies

- Regular security audits with `pnpm audit`
- No known vulnerabilities in dependencies
- Minimal dependency footprint

## Security Testing

### Automated Tests

- CSP generation validation
- Domain whitelist testing
- Input sanitization verification
- Malicious content detection
- Email/URL validation testing

### Test Coverage

- Security utilities: 100% test coverage
- Error boundary security logging: Tested
- Middleware security: Tested

## Monitoring and Alerting

### Error Reporting

- Production errors logged with sanitized details
- User agent and URL information captured
- Timestamp tracking for error analysis
- Configurable monitoring service integration

### Security Events

- Suspicious bot detection
- Rate limit violations
- CSP violations (when implemented)
- Error boundary triggers

## Best Practices

### Development

1. Always validate user input
2. Use the provided security utilities
3. Test security features thoroughly
4. Keep dependencies updated
5. Follow CSP guidelines

### Deployment

1. Ensure HTTPS is properly configured
2. Monitor security headers
3. Set up error monitoring
4. Regular security audits
5. Keep server software updated

## Security Checklist

- [x] Security headers implemented
- [x] CSP configured
- [x] Input validation and sanitization
- [x] Rate limiting
- [x] Bot protection
- [x] Error handling security
- [x] External resource validation
- [x] Production build security
- [x] Security testing
- [x] Documentation

## Incident Response

In case of a security incident:

1. **Immediate**: Block suspicious IPs if necessary
2. **Assessment**: Review logs and identify scope
3. **Containment**: Update security measures
4. **Recovery**: Restore normal operations
5. **Post-incident**: Update security measures and documentation

## Contact

For security-related questions or to report vulnerabilities, please contact the development team.

---

_Last updated: $(date)_
_Version: 1.0.0_
