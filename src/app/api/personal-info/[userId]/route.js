// pages/api/personal-info/[userId].js
import { NextResponse } from 'next/server';
import { queryDB } from '../../../../../lib/db';

export async function GET(req, { params }) {
  const { userId } = params;
  try {
    const result = await queryDB('SELECT * FROM PersonalInfo WHERE user_id = $1', [userId]);
    const user = result.rows[0]; // Get the first row from the result

    if (!user) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { userId } = params;
  const data = await req.json(); // Parse incoming JSON data

  const {
    first_name,
    middle_name,
    last_name,
    birthday,
    address,
    phone,
    website,
    bio,
    linked_in,
    github,
    profile_img
  } = data;

  try {
    const result = await queryDB(
      `
        UPDATE PersonalInfo
        SET first_name = $1, middle_name = $2, last_name = $3, birthday = $4, address = $5, phone = $6, website = $7, bio = $8, linked_in = $9, github = $10, profile_img = $11
        WHERE user_id = $12
      `,
      [first_name, middle_name, last_name, birthday, address, phone, website, bio, linked_in, github, profile_img, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'No data updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req,{params}) {
  const body = await req.json();
  const { userId } = params;
  try {
    const result = await queryDB(
      `
        INSERT INTO PersonalInfo (user_id, first_name, middle_name, last_name, birthday, address, phone, website, bio, linked_in, github, profile_img)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING user_id
      `,
      [
        userId,
        body.first_name,
        body.middle_name,
        body.last_name,
        body.birthday,
        body.address,
        body.phone,
        body.website,
        body.bio,
        body.linked_in,
        body.github,
        body.profile_img
      ]
    );

    return NextResponse.json({ message: 'Data saved successfully', insertId: result.rows[0].user_id });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
