import connent from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET() {
  await connent();
  try {
    const blogs = await User.find({})

    return NextResponse.json(blogs);

  } catch (error) {
    return NextResponse.json({
      message: "GET error",
      status: 500,
    });
  }
}