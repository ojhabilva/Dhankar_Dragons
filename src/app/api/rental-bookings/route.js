import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import RentalBooking from "@/models/RentalBooking.js";
import RentalService from "@/models/RentalService.js";

export async function GET() {
    await connectDB();
    try {
        const bookings = await RentalBooking.findAll({ order: [['id', 'DESC']] });
        const services = await RentalService.findAll();

        const enrichedBookings = bookings.map(booking => {
            const plainBooking = booking.get({ plain: true });
            const service = services.find(s => s.id == plainBooking.rental_service_id);
            return {
                ...plainBooking,
                service_type: service ? service.type : "Unknown"
            };
        });

        return NextResponse.json(enrichedBookings);
    } catch (error) {
        console.error("RENTAL BOOKINGS GET ERROR:", error);
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
        console.error("RENTAL BOOKINGS POST ERROR:", error);
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
        console.error("RENTAL BOOKINGS PUT ERROR:", error);
        return NextResponse.json({ msg: "Server Error", error: error.message }, { status: 500 });
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
        console.error("RENTAL BOOKINGS DELETE ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
