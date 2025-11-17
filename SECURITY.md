# Security Features

This LUXE Real Estate application implements comprehensive security measures to protect user data and prevent common web vulnerabilities.

## Implemented Security Features

### 1. HTTPS Enforcement
- All connections are forced to use HTTPS via `upgrade-insecure-requests` in CSP
- Meta tag in layout enforces HTTPS upgrades

### 2. Content Security Policy (CSP)
Located in `next.config.mjs`:
- Restricts resource loading to trusted sources
- Prevents inline script execution (with necessary exceptions for Next.js)
- Blocks object/embed tags
- Enforces HTTPS for all requests

### 3. Security Headers
Implemented in both `next.config.mjs` and `middleware.ts`:
- **X-Frame-Options**: DENY - Prevents clickjacking attacks
- **X-Content-Type-Options**: nosniff - Prevents MIME type sniffing
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### 4. Input Sanitization
Located in `lib/security-utils.ts`:
- All user inputs are sanitized to prevent XSS attacks
- HTML entities are escaped
- Use DOMPurify library for production (install via npm)

### 5. CSRF Protection
Implemented in `middleware.ts`:
- Origin validation for POST requests
- CSRF token generation and validation utilities
- Cross-site request forgery prevention

### 6. Rate Limiting
Located in `middleware.ts`:
- 100 requests per minute per IP address
- Prevents brute force attacks
- Returns 429 status when limit exceeded
- In production, use Redis for distributed rate limiting

### 7. Password Security
Located in `lib/security-utils.ts`:
- Passwords hashed using bcrypt (10 rounds)
- Never store plain text passwords
- Install bcrypt: `npm install bcrypt @types/bcrypt`

### 8. Input Validation
Located in `lib/validations.ts`:
- Zod schema validation for all forms
- Email format validation
- DNI/Passport format validation
- Password strength requirements (min 6 characters)

### 9. Firebase Security Rules
Located in `database.rules.json`:
- Role-based access control (RBAC)
- User data isolation
- Admin-only write access for properties
- Read authentication required

### 10. CORS Configuration
- Strict same-origin policy
- No wildcard CORS allowed
- Origin validation in middleware

## Production Deployment Checklist

### Environment Variables
Set these in your Vercel project settings:

\`\`\`bash
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Security (Optional)
NEXTAUTH_SECRET=generate_random_string_here
NEXTAUTH_URL=https://your-domain.com
\`\`\`

### Required Dependencies
Install production security dependencies:

\`\`\`bash
npm install bcrypt @types/bcrypt
npm install dompurify @types/dompurify
\`\`\`

### Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create a Realtime Database
4. Deploy security rules: `firebase deploy --only database`
5. Add your domain to authorized domains in Firebase Console

### Security Audits
Run regular security audits:

\`\`\`bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
\`\`\`

### Monitoring
- Enable Firebase Authentication monitoring
- Set up Vercel Analytics
- Monitor rate limit hits
- Track failed login attempts
- Set up alerts for suspicious activity

### Additional Recommendations

1. **Two-Factor Authentication**: Consider adding 2FA for admin accounts
2. **Session Management**: Implement proper session timeout (15-30 minutes)
3. **Audit Logging**: Log all admin actions and security events
4. **Data Encryption**: Encrypt sensitive data at rest in Firebase
5. **Regular Backups**: Set up automated database backups
6. **Penetration Testing**: Conduct regular security assessments
7. **GDPR Compliance**: Implement data deletion and export features
8. **SSL Certificate**: Ensure proper SSL/TLS configuration (Vercel handles this)

## Reporting Security Issues

If you discover a security vulnerability, please email security@luxe-realestate.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Do NOT create public GitHub issues for security vulnerabilities.

## Security Best Practices for Developers

1. Never commit sensitive credentials to version control
2. Always validate and sanitize user inputs
3. Use prepared statements for database queries
4. Keep dependencies up to date
5. Follow the principle of least privilege
6. Implement proper error handling (don't expose stack traces)
7. Use secure session management
8. Implement proper authentication and authorization
9. Regular security training for the development team
10. Code reviews with security focus

## Compliance

This application implements security measures aligned with:
- OWASP Top 10
- GDPR requirements
- PCI DSS standards (if handling payments)
- ISO 27001 guidelines

## License

All security measures are proprietary to LUXE Real Estate.
