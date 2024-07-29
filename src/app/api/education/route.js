// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { openDB } from '../../../../lib/db';

export async function GET() {
  try {
    const db = await openDB();

    const educations = await db.all('SELECT * FROM Education');
    return NextResponse.json({ educations },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
