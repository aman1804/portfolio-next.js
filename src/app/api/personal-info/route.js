// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { openDB } from '../../../../lib/db';

export async function GET(req) {
  try {
    const db = await openDB();
    const personalInfo = await db.get('SELECT * FROM PersonalInfo');
    return NextResponse.json({personalInfo});
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

