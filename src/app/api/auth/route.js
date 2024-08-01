// import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextResponse } from "next/server";
import { openDB } from "../../../../lib/db";

export async function GET(){
    return NextResponse.json({result:true},{status:201})
}

export async function POST(req) {
    try {
        const body = await req.json();

        const db = await openDB();

        const user = await db.get(
            "SELECT * FROM Users WHERE (username = ? OR email = ?) AND password = ?", 
            [body.username, body.username, body.password]
        );

        
        if (user) {
            const res = NextResponse.json({ user }, { status: 200 });

            // Set a cookie with the user ID or token
            res.cookies.set('user', JSON.stringify(user), {
              httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
              secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
              path: '/',
              maxAge: 60 * 60 * 24 * 7, // Cookie expires in one week
            });
        
            return res;
        }

        return NextResponse.json({ message: "Not Found" }, { status: 401 });
    } catch (error) {
        console.error('Error processing request', error);
        return NextResponse.json({ message: "Internal Server Error ",error }, { status: 500 });
    }
}