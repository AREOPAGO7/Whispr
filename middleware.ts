import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/jwt-verify';

export async function middleware(request: NextRequest) {
  // Get the session cookie
  const session = request.cookies.get('session');

  // Check if the path is /explore
  if (request.nextUrl.pathname.startsWith('/explore')) {
    if (!session?.value) {
      // Redirect to home page if no session exists
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Verify the token
      await verifyToken(session.value);
      return NextResponse.next();
    } catch (error) {
      // If token is invalid, redirect to home
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/explore/:path*'
};