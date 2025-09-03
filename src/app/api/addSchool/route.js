import pool from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    let imagePath = null;

    // Prevent duplicates
    const [rows] = await pool.query(
      "SELECT * FROM schools WHERE name = ? AND city = ? AND state = ?",
      [name, city, state]
    );
    if (rows.length > 0) {
      return NextResponse.json({ error: "School already added!" }, { status: 400 });
    }

    // Handle image upload
    if (image && typeof image.name === "string") {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${image.name}`;
      imagePath = `/schoolImages/${fileName}`;

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    }

    // Insert into Railway DB
    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    return NextResponse.json({ message: "School added successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving school:", error);
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
  }
}
