import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      console.error('No token provided to session API');
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    console.log('Setting session cookie with token');
    
    const cookieStore = await cookies();

    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    console.log('Session cookie set successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in session API:', error);
    return NextResponse.json(
      { error: 'Failed to set session' }, 
      { status: 500 }
    );
  }
}
