import { NextResponse } from "next/server";
import sendEmail from "@/lib/emailing/nodemailer.email"
import { fetchUserByEmail } from "@/lib/actions/user.actions";
import { accountsEmail } from "@/lib/emailing/mailing.email";

export async function POST(req: any) {
    const { email, subject, heading, content} = await req.json()
    try {
        const user = await fetchUserByEmail(email)
        if(!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            )
        }
        if(!user.isEmailVerified) {
            return NextResponse.json(
                { message: "User not verified." },
                { status: 401 }
            )
        }

        accountsEmail({
            email: email,
            subject: subject,
            heading: heading,
            content: content
          })
          
          return NextResponse.json(
            {message: "Check email, Link sent"},
            {status: 300}
          )

    } catch(error: any) {
        return NextResponse.json(
            { message: "An error occurred while registering the user. retry" },
            { status: 500 }
          );
    }
}