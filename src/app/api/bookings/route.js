import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import Booking from "@/models/Booking";

await connectDB();

export async function GET() {
    try {
        const bookings = await Booking.findAll();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newBooking = await Booking.create(body);
        return NextResponse.json(newBooking);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        await Booking.update(updateData, { where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Booking.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
