import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import Room from "@/models/Room";

export async function GET() {
    await connectDB();
    try {
        const rooms = await Room.findAll();
        return NextResponse.json(rooms);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newRoom = await Room.create(body);
        return NextResponse.json(newRoom);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    await connectDB();
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        await Room.update(updateData, { where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Room.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
