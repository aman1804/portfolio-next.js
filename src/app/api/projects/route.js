// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { queryDB } from '../../../../lib/db';

export async function GET() {
  try {
    const result = await queryDB('SELECT * FROM Projects');
    const projects = result.rows; // Access the rows from the result

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
