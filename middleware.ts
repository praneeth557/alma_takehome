import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token');
  const userRole = request.cookies.get('user-role');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLeadFormRoute = request.nextUrl.pathname === '/lead-form';
  const isLoginPage = request.nextUrl.pathname === '/';

  // If not authenticated, redirect to login page (except for login page itself)
  if (!authToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If authenticated and trying to access login page, redirect based on role
  if (authToken && isLoginPage) {
    if (userRole?.value === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else {
      return NextResponse.redirect(new URL('/lead-form', request.url));
    }
  }

  // If trying to access admin routes without admin role, redirect to lead form
  if (isAdminRoute && userRole?.value !== 'admin') {
    return NextResponse.redirect(new URL('/lead-form', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/lead-form'],
};