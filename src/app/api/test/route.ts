import db from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request,) {
  await db.connectDb();
  console.log("DB OKAYYYYYYY")
  await db.disconnectDb();
  return NextResponse.json({ message: "API OKAY BOS" }, { status: 200 });
};

type User = {
  user: string;
  password: string
}

export async function POST(req: Request) {
  try {
    await db.connectDb();
    const { user, password }: User = await req.json();
    await db.disconnectDb();
    return NextResponse.json({ message: "API OKAY BOS", user, password }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}