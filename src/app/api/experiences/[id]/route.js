import { NextResponse } from 'next/server';
import { openDB } from '../../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const db = await openDB();
    const { id } = params;

    const experiences = await db.all('SELECT * FROM Experience WHERE user_id=?', [id]);
    return NextResponse.json( experiences , { status: 200 });
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
  
      for (const exp of data) {
        if (exp.id) {
          // Update existing records
          await db.run(
            `UPDATE Experience SET user_id = ?, company_name = ?, position = ?, start_date = ?, end_date = ?, responsibilities = ? WHERE id = ?`,
            [id, exp.company_name, exp.position, exp.start_date, exp.end_date, exp.responsibilities, exp.id]
          );
        } else {
          // Insert new records
          await db.run(
            `INSERT INTO Experience (user_id, company_name, position, start_date, end_date, responsibilities) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [id, exp.company_name, exp.position, exp.start_date, exp.end_date, exp.responsibilities]
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
      await db.run('DELETE FROM Experience WHERE id = ?', [id]);
      
      // Commit the transaction
      await db.exec('COMMIT');
      
      return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
    } catch (error) {
      // Rollback the transaction on error
      await db.exec('ROLLBACK');
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }