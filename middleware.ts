export { default } from 'next-auth/middleware';

export const config = {
  // Bắt buộc đăng nhập cho toàn bộ ứng dụng, ngoại trừ api, _next/static, _next/image, favicon.ico và auth
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
};
