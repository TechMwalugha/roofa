import { regenerateReceipt } from "@/lib/actions/all.action"
import { checkForRateLimit } from "@/lib/upstash";
import { headers } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(req: any) {
    try {

        //check for rate limits 

        const ip = headers().get('x-forwarded-for')

       const isRateLimit =  await checkForRateLimit({ ip: ip })

       if(!isRateLimit)  return NextResponse.json(
        { message: "Rate limit reached, please try again after 5 minutes." },
        { status: 403 }
      );

    const { merchantRequestId } = await req.json()

    const response = await regenerateReceipt({ id: merchantRequestId })

    return NextResponse.json({
        message: response ? "Receipt sent successfully. Kindly check your email" : "Receipt not regenerated. Try again"
    }, {
        status: 200
    })


    } catch(error: any) {
        return NextResponse.json({
            message: `An error occurred while generating Receipt. Please try again.`
        },
    {
        status: 500
    })
    }
}