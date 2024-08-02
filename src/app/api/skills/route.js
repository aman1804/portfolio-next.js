// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { openDB } from '../../../../lib/db';

export async function GET() {
  try {
    const db = await openDB();

    const skills = await db.all('SELECT * FROM Skills WHERE user_id=1');
    return NextResponse.json({ skills },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
