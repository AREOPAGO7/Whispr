import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;

  // Protect all routes under /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Verify token here if needed
      // You can also add additional token validation logic
      
      // Add token to request headers for API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${authToken}`);

      return NextResponse.next({
        headers: requestHeaders,
      });
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Prevent authenticated users from accessing login/signup pages
  if (authToken && (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
};