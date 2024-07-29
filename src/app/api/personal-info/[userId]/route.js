// pages/api/personal-info/[userId].js
import { NextResponse } from 'next/server';
import { openDB } from '../../../../../lib/db';

export async function GET(req, { params }) {
    const { userId } = params;
    const db = await openDB();
    console.log(req)
    try {
        const user = await db.get('SELECT * FROM PersonalInfo WHERE user_id = ?', [userId]);

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
    const db = await openDB();
    const data = await req.json(); // Parse incoming JSON data

    const { first_name, middle_name, last_name, birthday, address, phone, website, bio, linked_in, github, profile_img } = data;

    try {
        const result = await db.run(`
            UPDATE PersonalInfo
            SET first_name = ?, middle_name = ?, last_name = ?, birthday = ?, address = ?, phone = ?, website = ?, bio = ?, linked_in = ?, github = ?, profile_img = ?
            WHERE user_id = ?
        `, [first_name, middle_name, last_name, birthday, address, phone, website, bio, linked_in, github, profile_img, userId]);

        if (result.changes === 0) {
            return NextResponse.json({ message: 'No data updated' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    const { body } = req;
    
    const db = await openDB();

    try {
        const result = await db.query(
            'INSERT INTO PersonalInfo (user_id, first_name, middle_name, last_name, birthday, address, phone, website, bio, linked_in, github, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                body.user_id,
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

        return NextResponse.json({ message: 'Data saved successfully', insertId: result.insertId });
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
