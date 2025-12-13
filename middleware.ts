import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Kiểm tra nếu đang truy cập /admin/documents
  if (request.nextUrl.pathname === '/admin/documents') {
    const token = request.cookies.get('admin_token');

    // Nếu không có token, redirect đến login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
