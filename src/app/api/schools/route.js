import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "schooldb",
});

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");
    return NextResponse.json(rows, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
