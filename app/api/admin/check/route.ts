import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token');

  if (token && token.value === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
