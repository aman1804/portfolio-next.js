import { NextResponse } from 'next/server';
import { openDB } from '../../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const db = await openDB();
    const { id } = params;

    const education = await db.all('SELECT * FROM Education WHERE user_id=?', [id]);
    return NextResponse.json({ education }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(request, { params }) {
    const db = await openDB();
    const data = await request.json();
    const { id } = params;
  
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
  
    try {
      // Start a transaction
      await db.exec('BEGIN TRANSACTION');
  
      for (const edu of data) {
        if (edu.id) {
          // Update existing records
          await db.run(
            `UPDATE Education SET user_id = ?, institution = ?, degree = ?, field_of_study = ?, start_date = ?, end_date = ?, grade = ? WHERE id = ?`,
            [id, edu.institution, edu.degree, edu.field_of_study, edu.start_date, edu.end_date, edu.grade, edu.id]
          );
        } else {
          // Insert new records
          await db.run(
            `INSERT INTO Education (user_id, institution, degree, field_of_study, start_date, end_date, grade) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, edu.institution, edu.degree, edu.field_of_study, edu.start_date, edu.end_date, edu.grade]
          );
        }
      }
  
      // Commit the transaction
      await db.exec('COMMIT');
      
      return NextResponse.json({ success: true, message: "Data Saved Successfully!" }, { status: 200 });
    } catch (error) {
      // Rollback the transaction on error
      await db.exec('ROLLBACK');
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function DELETE(request, { params }) {
    const db = await openDB();
    const { id } = params;
  
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    try {
      // Start a transaction
      await db.exec('BEGIN TRANSACTION');
      
      // Delete the record
      await db.run('DELETE FROM Education WHERE id = ?', [id]);
      
      // Commit the transaction
      await db.exec('COMMIT');
      
      return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
    } catch (error) {
      // Rollback the transaction on error
      await db.exec('ROLLBACK');
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }