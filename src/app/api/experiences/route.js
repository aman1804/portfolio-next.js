// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { openDB } from '../../../../lib/db';

export async function GET() {
  try {
    const db = await openDB();

    const experiences = await db.all('SELECT * FROM Experience');
    return NextResponse.json({ experiences },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
