// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { openDB } from '../../../../lib/db';

export async function GET(req) {
  try {
    const db = await openDB();
    const users = await db.all('SELECT * FROM users');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
