// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { queryDB } from '../../../../lib/db';

export async function GET(req) {
  try {
    const result = await queryDB('SELECT * FROM PersonalInfo');
    const personalInfo = result.rows[0]; // `rows` contains the query results
    return NextResponse.json({ personalInfo });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
