import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ==================== ADMIN UI ROUTE PROTECTION ====================
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const sessionCookie = request.cookies.get('alzair_admin_session') || request.cookies.get('syab_admin_session');

    let isValidSession = false;
    if (sessionCookie && sessionCookie.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value);
        if (parsed && (parsed.email || parsed.role)) {
          isValidSession = true;
        }
      } catch {
        isValidSession = false;
      }
    }

    // Unauthenticated user trying to access protected admin pages -> Redirect to Login
    if (!isValidSession && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated admin trying to visit /admin/login -> Redirect to Dashboard
    if (isValidSession && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 2. ==================== ADMIN API ROUTE PROTECTION ====================
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const sessionCookie = request.cookies.get('alzair_admin_session') || request.cookies.get('syab_admin_session');
    let isValidSession = false;

    if (sessionCookie && sessionCookie.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value);
        if (parsed && (parsed.email || parsed.role)) {
          isValidSession = true;
        }
      } catch {
        isValidSession = false;
      }
    }

    if (!isValidSession) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Admin authentication session is missing or invalid.' },
        { status: 401 }
      );
    }
  }

  // 3. ==================== GLOBAL SECURITY HEADERS ====================
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all admin pages and admin APIs
     */
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
