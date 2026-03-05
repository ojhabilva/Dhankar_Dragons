import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";
import Package from "@/models/Package.js";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const pkg = await Package.findByPk(params.id);
        if (!pkg) {
            return NextResponse.json({ msg: "Package not found" }, { status: 404 });
        }
        return NextResponse.json(pkg);
    } catch (error) {
        console.error("Package fetch error:", error);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}
