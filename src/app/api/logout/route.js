// src/app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response object
    const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    // Set the cookie with an expired date to remove it
    res.cookies.set('user', '', {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      path: '/',
      expires: new Date(0), // Set an expired date to delete the cookie
    });

    return res;
  } catch (error) {
    console.error('Error processing logout request:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
