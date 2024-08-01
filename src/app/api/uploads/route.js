// app/api/upload/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  // Get the form data
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !file.size) {
    return new NextResponse('No file uploaded!', { status: 400 });
  }

  // Define the file path (use the same name for overwriting)
  const filePath = path.join(process.cwd(), 'public', 'uploads', 'my-resume.pdf');

  // Read file data
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Write file to the filesystem (overwrite if it exists)
  try {
    fs.writeFileSync(filePath, fileBuffer);
    return NextResponse.json({message:'File uploaded and replaced successfully!',fileUrl:'/uploads/my-resume.pdf'}, { status: 200 });
  } catch (error) {
    return new NextResponse('File upload failed!', { status: 500 });
  }
}
