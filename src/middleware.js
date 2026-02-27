import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.headers
    .get("authorization")
    ?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { msg: "No token" },
      { status: 401 }
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { msg: "Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/protected/:path*"]
};
