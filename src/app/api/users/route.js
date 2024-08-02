// src/app/api/users/route.js

import { NextResponse } from 'next/server';
import { queryDB } from '../../../../lib/db'; // Adjust the path if necessary

export async function GET(req) {
  try {
    // Query to get all users
    const result = await queryDB('SELECT * FROM users');
    const users = result.rows; // PostgreSQL result rows
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
