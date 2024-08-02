// app/api/projects/route.js

import { NextResponse } from 'next/server';
import { queryDB } from '../../../../../lib/db'; // Adjust the path if necessary

export async function GET(req, { params }) {
  try {
    const { id } = params;
    
    // Fetch skills for the given user_id
    const result = await queryDB('SELECT * FROM Skills WHERE user_id = $1', [id]);
    const skills = result.rows; // PostgreSQL result rows
    
    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const data = await request.json();

  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    // Start a transaction
    await queryDB('BEGIN');

    for (const skill of data) {
      if (skill.id) {
        // Update existing records
        await queryDB(
          `UPDATE Skills SET user_id = $1, skill_name = $2, proficiency_level = $3 WHERE id = $4`,
          [id, skill.skill_name, skill.proficiency_level, skill.id]
        );
      } else {
        // Insert new records
        await queryDB(
          `INSERT INTO Skills (user_id, skill_name, proficiency_level) VALUES ($1, $2, $3)`,
          [id, skill.skill_name, skill.proficiency_level]
        );
      }
    }

    // Commit the transaction
    await queryDB('COMMIT');
    
    return NextResponse.json({ success: true, message: 'Data Saved Successfully!' }, { status: 200 });
  } catch (error) {
    // Rollback the transaction on error
    await queryDB('ROLLBACK');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Start a transaction
    await queryDB('BEGIN');

    // Delete the record
    await queryDB('DELETE FROM Skills WHERE id = $1', [id]);
    
    // Commit the transaction
    await queryDB('COMMIT');
    
    return NextResponse.json({ success: true, message: 'Deleted Successfully!' }, { status: 200 });
  } catch (error) {
    // Rollback the transaction on error
    await queryDB('ROLLBACK');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
