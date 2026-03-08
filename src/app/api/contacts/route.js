import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import ContactSubmission from "@/models/ContactSubmission.js";

export async function GET() {
    await connectDB();
    try {
        const contacts = await ContactSubmission.findAll({ order: [["id", "DESC"]] });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error("CONTACTS GET ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newContact = await ContactSubmission.create(body);
        return NextResponse.json(newContact);
    } catch (error) {
        console.error("CONTACTS POST ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await ContactSubmission.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("CONTACTS DELETE ERROR:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
