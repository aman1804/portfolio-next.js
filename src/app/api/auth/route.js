// import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({result:true},{status:201})
}