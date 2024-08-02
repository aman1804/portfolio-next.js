// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { queryDB, runTransaction } from '../../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const result = await queryDB('SELECT * FROM Projects WHERE user_id = $1', [id]);
    const projects = result.rows; // Access rows from the result

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
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
    const queries = data.map(project => {
      if (project.id) {
        // Update existing records
        return {
          text: `
            UPDATE Projects
            SET user_id = $1, title = $2, description = $3, url = $4, start_date = $5, end_date = $6, technologies = $7, github_link = $8
            WHERE id = $9
          `,
          values: [id, project.title, project.description, project.url, project.start_date, project.end_date, project.technologies, project.github_link, project.id]
        };
      } else {
        // Insert new records
        return {
          text: `
            INSERT INTO Projects (user_id, title, description, url, start_date, end_date, technologies, github_link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          `,
          values: [id, project.title, project.description, project.url, project.start_date, project.end_date, project.technologies, project.github_link]
        };
      }
    });

    await runTransaction(queries);

    return NextResponse.json({ success: true, message: "Data Saved Successfully!" }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await queryDB('BEGIN');
    await queryDB('DELETE FROM Projects WHERE id = $1', [id]);
    await queryDB('COMMIT');

    return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
  } catch (error) {
    await queryDB('ROLLBACK');
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
