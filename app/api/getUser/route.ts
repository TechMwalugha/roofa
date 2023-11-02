import { fetchUserByEmail } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        const { email } = await req.json();
        const user = await fetchUserByEmail(email)
        if(!user) return NextResponse.json({ message: 'user does not exists'}, { status: 401})
        if(user.signInType ==="google") return NextResponse.json({ message: 'Kindly, Use google signIn'}, { status: 401})
        return NextResponse.json({ message: "user fetched successfully.", user }, { status: 201 });

    } catch(error) {
        return NextResponse.json(
            { message: "An error occurred while fetching the user." },
            { status: 500 }
        );
    }
}