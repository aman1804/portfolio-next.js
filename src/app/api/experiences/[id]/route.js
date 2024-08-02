// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { queryDB, runTransaction } from '../../../../../lib/db';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await queryDB('SELECT * FROM Experience WHERE user_id = $1', [id]);
    const experiences = result.rows;

    return NextResponse.json(experiences, { status: 200 });
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
    const queries = data.map(exp => {
      if (exp.id) {
        // Update existing records
        return {
          text: `
            UPDATE Experience
            SET user_id = $1, company_name = $2, position = $3, start_date = $4, end_date = $5, responsibilities = $6
            WHERE id = $7
          `,
          values: [id, exp.company_name, exp.position, exp.start_date, exp.end_date, exp.responsibilities, exp.id]
        };
      } else {
        // Insert new records
        return {
          text: `
            INSERT INTO Experience (user_id, company_name, position, start_date, end_date, responsibilities)
            VALUES ($1, $2, $3, $4, $5, $6)
          `,
          values: [id, exp.company_name, exp.position, exp.start_date, exp.end_date, exp.responsibilities]
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
    await queryDB('DELETE FROM Experience WHERE id = $1', [id]);
    await queryDB('COMMIT');

    return NextResponse.json({ success: true, message: "Deleted Successfully!" }, { status: 200 });
  } catch (error) {
    await queryDB('ROLLBACK');
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
