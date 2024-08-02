// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { queryDB, runTransaction } from '../../../../../lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const result = await queryDB('SELECT * FROM Education WHERE user_id = $1', [id]);
    const education = result.rows;

    return NextResponse.json({ education }, { status: 200 });
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
    const queries = data.map(edu => {
      if (edu.id) {
        // Update existing records
        return {
          text: `
            UPDATE Education
            SET user_id = $1, institution = $2, degree = $3, field_of_study = $4, start_date = $5, end_date = $6, grade = $7
            WHERE id = $8
          `,
          values: [id, edu.institution, edu.degree, edu.field_of_study, edu.start_date, edu.end_date, edu.grade, edu.id]
        };
      } else {
        // Insert new records
        return {
          text: `
            INSERT INTO Education (user_id, institution, degree, field_of_study, start_date, end_date, grade)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          values: [id, edu.institution, edu.degree, edu.field_of_study, edu.start_date, edu.end_date, edu.grade]
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
    await queryDB('DELETE FROM Education WHERE id = $1', [id]);
    await queryDB('COMMIT');

    return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
  } catch (error) {
    await queryDB('ROLLBACK');
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
