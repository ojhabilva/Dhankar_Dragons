import { NextResponse } from "next/server";
import Testimonial from "@/models/testimonial.model";
import { connectDB } from "@/config/database.js";
import { verifyAdmin } from "@/utils/auth";

await connectDB();

export async function GET() {
  try {
    const testimonials = await Testimonial.findAll({
      where: { is_active: 1 },
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("TESTIMONIAL GET ERROR:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  try {
    const { name, image, text, rating } = await req.json();
    if (!name || !image || !text || !rating) {
      return NextResponse.json({ msg: "All fields are required" }, { status: 400 });
    }
    const testimonial = await Testimonial.create({ name, image, text, rating, is_active: 1 });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error("TESTIMONIAL POST ERROR:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
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
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Testimonial.destroy({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}
