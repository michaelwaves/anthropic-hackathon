// app/api/login/route.ts (App Router API route)
import { NextResponse } from "next/server";

const correctEmail = process.env.EMAIL
const correctPass = process.env.PASSWORD
export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (email === correctEmail && password === correctPass) {
        const response = NextResponse.json({ success: true });

        // Set HTTP-only cookie
        response.cookies.set("auth_token", "yummy_secure_cookies", {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
