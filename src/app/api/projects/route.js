// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { openDB } from '../../../../lib/db';

export async function GET() {
  try {
    const db = await openDB();

    const projects = await db.all('SELECT * FROM Projects');
    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
