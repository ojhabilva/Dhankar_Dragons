import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import Package from "@/models/Package";

await connectDB();

export async function GET() {
    try {
        const pkgs = await Package.findAll({ where: { is_active: 1 } });
        return NextResponse.json(pkgs);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newPkg = await Package.create(body);
        return NextResponse.json(newPkg);
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        await Package.update(updateData, { where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Package.destroy({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
