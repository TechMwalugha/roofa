import { regenerateReceipt } from "@/lib/actions/all.action"
import { NextResponse } from "next/server"

export async function POST(req: any) {
    const { merchantRequestId } = await req.json()

    const response = await regenerateReceipt({ id: merchantRequestId })

    return NextResponse.json({
        message: true ? "Receipt sent successfully. Kindly check your email" : "Receipt not regenerated. Try again"
    }, {
        status: 200
    })
}