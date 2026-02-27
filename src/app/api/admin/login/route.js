import bcrypt from "bcryptjs";
import User from "@/models/User";
import { generateToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/database.js";

await connectDB();

export async function POST(req) {
  try {



    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { msg: "Email & password required" },
        { status: 400 }
      );
    }


    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken({
        id: 0,
        role: "admin",
        email: email
      });

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: 0,
          first_name: "Admin",
          last_name: "User",
          email: email,
          role: "admin",
          is_active: 1
        }
      });
    }


    const user = await User.findOne({
      where: {
        email,
        is_active: 1
      }
    });

    if (!user) {
      return NextResponse.json(
        { msg: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { msg: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = generateToken({
      id: user.id,
      role: user.role
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        is_active: user.is_active
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Server error" },
      { status: 500 }
    );
  }
}
