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

export async function POST(request,{params}) {
  const db = await openDB();
  const data = await request.json();
  const { id } = params

  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    // Start a transaction
    await db.exec('BEGIN TRANSACTION');

    for (const skill of data) {
      if (skill.id) {
        // Update existing records
        await db.run(
          `UPDATE Skills SET user_id = ?, skill_name = ?, proficiency_level = ? WHERE id = ?`,
          [id, skill.skill_name, skill.proficiency_level, skill.id]
        );
      } else {
        // Insert new records
        await db.run(
          `INSERT INTO Skills (user_id, skill_name, proficiency_level) 
          VALUES (?, ?, ?)`,
          [id, skill.skill_name, skill.proficiency_level]
        );
      }
    }

    // Commit the transaction
    await db.exec('COMMIT');
    
    return NextResponse.json({ success: true , message:"Data Save Successfully!"},{status:200});
  } catch (error) {
    // Rollback the transaction on error
    await db.exec('ROLLBACK');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}