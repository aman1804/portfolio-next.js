// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { openDB } from '../../../../../lib/db';

export async function GET(req,{ params }) {
  try {
    const db = await openDB();
    const { id } = params

    const skills = await db.all('SELECT * FROM Skills WHERE user_id=?',[id]); 
    return NextResponse.json({ skills },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
