import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import RentalService from "@/models/RentalService.js";

export async function GET() {
    await connectDB();
    try {
        const rentals = await RentalService.findAll();
        return NextResponse.json(rentals);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newRental = await RentalService.create(body);
        return NextResponse.json(newRental);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    await connectDB();
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        await RentalService.update(updateData, { where: { id } });
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
        await RentalService.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
