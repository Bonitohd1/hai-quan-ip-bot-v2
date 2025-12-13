import { NextRequest, NextResponse } from 'next/server';

// Thay đổi username/password này thành những gì bạn muốn
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // THAY ĐỔI NGAY!

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Tạo response với cookie
      const response = NextResponse.json({ success: true });
      
      // Set cookie với token
      response.cookies.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 giờ
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi login' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', { maxAge: 0 });
  return response;
}
