import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Check if the user has the 'auth_token' cookie
  const auth = request.cookies.get('auth_token');

  // 2. If no cookie AND they aren't already on the login page, send them to login
  if (!auth && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Otherwise, let them through
  return NextResponse.next();
}

// This tells Vercel NOT to run middleware on images or internal files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};