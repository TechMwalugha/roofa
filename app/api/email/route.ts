import { NextResponse } from "next/server";
import { fetchUserByEmail } from "@/lib/actions/user.actions";
import { accountsEmail } from "@/lib/emailing/mailing.email";
import { headers } from "next/headers";
import { checkForRateLimit } from "@/lib/upstash";
import { apiKeys } from "@/lib/utils";



export async function POST(req: any) {
    
    try {

        //check for rate limits 

        const ip = headers().get('x-forwarded-for')

       const isRateLimit =  await checkForRateLimit({ ip: ip })

       if(!isRateLimit)  return NextResponse.json(
        { message: "Rate limit reached, please try again after 5 minutes." },
        { status: 403 }
      );

       //check for the api key
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey || !apiKeys.includes(apiKey)) {
      return NextResponse.json(
          { message: "Unauthorized. Invalid API key." },
          { status: 401 }
      );
  }

        const { email, subject, heading, content} = await req.json()  
        
        if(!email || !subject || !heading || !content) return NextResponse.json(
            { message: "Please check your inputs." },
            { status: 400 }
        )
    
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
            {message: "Check your email, the link has been sent."},
            {status: 300}
          )

    } catch(error: any) {
        return NextResponse.json(
            { message: "An error occurred while registering the user. retry" },
            { status: 500 }
          );
    }
}