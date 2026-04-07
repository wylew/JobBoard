import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We check for a cookie named 'auth_token'
  const authCookie = request.cookies.get('auth_token');

  // If no cookie and not on the login page, redirect to login
  if (!authCookie && !request.nextUrl.pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// This 'matcher' tells Next.js exactly which pages to protect
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};