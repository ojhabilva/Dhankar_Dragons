import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import RentalBooking from "@/models/RentalBooking";
import RentalService from "@/models/RentalService";

export async function GET() {
    await connectDB();
    try {
        const bookings = await RentalBooking.findAll();
        const services = await RentalService.findAll();

        // Enrich bookings with service details
        const enrichedBookings = bookings.map(booking => {
            const service = services.find(s => s.id == booking.rental_service_id);
            return {
                ...booking,
                service_type: service ? service.type : "Unknown"
            };
        });

        return NextResponse.json(enrichedBookings);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newBooking = await RentalBooking.create(body);
        return NextResponse.json(newBooking);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    await connectDB();
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        await RentalBooking.update(updateData, { where: { id } });
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
        await RentalBooking.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
