import { NextResponse } from "next/server";
import Testimonial from "@/models/testimonial.model.js";
import { connectDB } from "@/config/database.js";
import { verifyAdmin } from "@/utils/auth.js";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    let where = { is_active: 1, status: "approved" };

    if (all === "true") {
      if (!verifyAdmin(req)) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
      }
      where = { is_active: 1 };
    }

    const testimonials = await Testimonial.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("TESTIMONIAL GET ERROR:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, text, rating } = await req.json();
    if (!name || !text || !rating) {
      return NextResponse.json({ msg: "All fields are required" }, { status: 400 });
    }
    const image = `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`;
    const testimonial = await Testimonial.create({ name, image, text, rating, status: "pending", is_active: 1 });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error("TESTIMONIAL POST ERROR:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    await Testimonial.update(updateData, { where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Testimonial.destroy({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}
