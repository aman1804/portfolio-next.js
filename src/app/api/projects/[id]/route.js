import { NextResponse } from 'next/server';
import { openDB } from '../../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const db = await openDB();
    const { id } = params;

    const projects = await db.all('SELECT * FROM Projects WHERE user_id=?', [id]);
    return NextResponse.json(projects , { status: 200 });
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

    for (const project of data) {
      if (project.id) {
        // Update existing records
        await db.run(
          `UPDATE Projects SET user_id = ?, title = ?, description = ?, url = ?, start_date = ?, end_date = ?, technologies = ?, github_link = ? WHERE id = ?`,
          [id, project.title, project.description, project.url, project.start_date, project.end_date, project.technologies, project.github_link, project.id]
        );
      } else {
        // Insert new records
        await db.run(
          `INSERT INTO Projects (user_id, title, description, url, start_date, end_date, technologies, github_link) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, project.title, project.description, project.url, project.start_date, project.end_date, project.technologies, project.github_link]
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
    await db.run('DELETE FROM Projects WHERE id = ?', [id]);
    
    // Commit the transaction
    await db.exec('COMMIT');
    
    return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
  } catch (error) {
    // Rollback the transaction on error
    await db.exec('ROLLBACK');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
