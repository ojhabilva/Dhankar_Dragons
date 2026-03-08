import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import GalleryImage from "@/models/GalleryImage.js";

export async function GET(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        const where = category ? { category } : {};
        const images = await GalleryImage.findAll({ where, order: [["id", "DESC"]] });
        return NextResponse.json(images);
    } catch (error) {
        console.error("GALLERY GET ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newImage = await GalleryImage.create(body);
        return NextResponse.json(newImage);
    } catch (error) {
        console.error("GALLERY POST ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await GalleryImage.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("GALLERY DELETE ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
