import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // Max requests per window

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Rate limiting
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()
  const rateLimitData = rateLimitMap.get(ip)

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
  } else {
    rateLimitData.count++
    if (rateLimitData.count > MAX_REQUESTS) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimitData.resetTime - now) / 1000)),
        },
      })
    }
  }

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  // Add security headers (fallback, primary headers in next.config.mjs)
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // CSRF protection for POST requests
  if (request.method === "POST") {
    const origin = request.headers.get("origin")
    const host = request.headers.get("host")

    if (origin && !origin.includes(host || "")) {
      return new NextResponse("CSRF validation failed", { status: 403 })
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
