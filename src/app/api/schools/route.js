import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json([], { status: 500 });
  }
}
