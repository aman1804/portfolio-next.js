// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { queryDB } from '../../../../lib/db';

export async function GET() {
  return NextResponse.json({ result: true }, { status: 201 });
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Query the database for the user
    const result = await queryDB(
      'SELECT * FROM Users WHERE (username = $1 OR email = $2) AND password = $3',
      [body.username, body.username, body.password]
    );
    
    const user = result.rows[0]; // Get the first user from the result

    if (user) {
      const res = NextResponse.json({ user }, { status: 200 });

      // Set a cookie with the user ID or token
      res.cookies.set('user', JSON.stringify(user), {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Cookie expires in one week
      });

      return res;
    }

    return NextResponse.json({ message: 'Not Found' }, { status: 401 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
