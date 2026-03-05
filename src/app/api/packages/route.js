import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import Package from "@/models/Package.js";

export async function GET() {
    try {
        await connectDB();
        const pkgs = await Package.findAll();
        return NextResponse.json(pkgs);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const newPkg = await Package.create(body);
        return NextResponse.json(newPkg);
    } catch (error) {
        console.error("Package creation error:", error);
        return NextResponse.json({ msg: "Server Error", error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        await Package.update(updateData, { where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Package update error:", error);
        return NextResponse.json({ msg: "Server Error", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Package.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Package deletion error:", error);
        return NextResponse.json({ msg: "Server Error", error: error.message }, { status: 500 });
    }
}
