// Security utilities for sanitization and validation

/**
 * Sanitize user input to prevent XSS attacks
 * In production, use DOMPurify library for client-side sanitization
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

/**
 * Hash password using bcrypt (server-side only)
 * Note: In production, use bcrypt library
 */
export async function hashPassword(password: string): Promise<string> {
  // This is a placeholder - in production use: bcrypt.hash(password, 10)
  // Example: const hashedPassword = await bcrypt.hash(password, 10)
  return `hashed_${password}`
}

/**
 * Verify password hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // This is a placeholder - in production use: bcrypt.compare(password, hash)
  // Example: return await bcrypt.compare(password, hash)
  return hash === `hashed_${password}`
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken
}

/**
 * Sanitize object keys and values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  check(identifier: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now()
    const userAttempts = this.attempts.get(identifier) || []

    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter((time) => now - time < windowMs)

    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    recentAttempts.push(now)
    this.attempts.set(identifier, recentAttempts)
    return true
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }
}
