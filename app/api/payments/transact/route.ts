
import { getAccessToken } from "@/lib/actions/payment.action";
import { NextResponse } from "next/server";
import moment from 'moment'
import axios from "axios";
import { createNewBooking } from "@/lib/actions/booking.action";
import { retrieveRentalPrice } from "@/lib/actions/rental.action";
import { z } from "zod";
import { ObjectId } from "mongoose";
import { headers } from "next/headers";
import { checkForRateLimit } from "@/lib/upstash";
import { apiKeys } from "@/lib/utils";

export async function POST(req: any) {
    try {
        //check for rate limits 

        const ip = headers().get('x-forwarded-for')

       const isRateLimit =  await checkForRateLimit({ ip: ip })

       if(!isRateLimit)  return NextResponse.json(
        { message: "Too many requests, please try again after 5 minutes." },
        { status: 429 }
      );

      //check for api key

      const apiKey = req.headers.get('x-api-key');

      if (!apiKey || !apiKeys.includes(apiKey)) {
        return NextResponse.json(
            { message: "Unauthorized. Invalid API key." },
            { status: 401 }
        );
    }

        const token = await getAccessToken()

        if(!token) return NextResponse.json(
        {message: "Transaction failed. Try again"},
        {status: 500}
      )

      // Define schema for request body validation
      const schema = z.object({
        email: z.string().email().min(4).max(50),
        fullName: z.string().min(4).max(50),
        reportingDate: z.any().refine(date => {
            const currentDate: Date = new Date();
            const reportingDate: Date = new Date(date);
            const differenceInDays: number = Math.floor((reportingDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
    
            return differenceInDays <= 10 && differenceInDays >= 0;
        }, { message: "The date is incorrect"}),
        mpesaPhoneNumber: z.string().refine(phoneNumber => /^(07\d|01\d|2547\d|2541\d)\d{7}$/.test(phoneNumber), { message: "Invalid message phone number"}),
        identityNumber: z.string().min(6).max(10),
        gender: z.enum(["female", "male"]),
        rentalId: z.string(),
    });

    // Parse and validate request body
    const requestBody = schema.parse(await req.json());

    // Destructure validated properties
    const { email, fullName, reportingDate, mpesaPhoneNumber, identityNumber, gender, rentalId } = requestBody;

      const amount: {status: string, amount: number} = await retrieveRentalPrice({
        rentalId: rentalId
      })

      if(amount.status !== 'success') return NextResponse.json(
        {message: 'Opps, an error occurred at our end. Please Try again'},
        {status: 200}
      )


        const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        const auth = `Bearer ${token}`
        const timeStamp = moment().format("YYYYMMDDHHmmss")
        const shortcode = "4131139"
        const password = Buffer.from(shortcode + process.env.MPESA_PASS_KEY + timeStamp).toString("base64")
        let phoneNumber = mpesaPhoneNumber

        if(mpesaPhoneNumber.startsWith('0')) {
            phoneNumber = `254${mpesaPhoneNumber.slice(1)}`
        }

       const response = await axios.post(url, {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timeStamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: "1",
            PartyA: phoneNumber,
            PartyB: shortcode,
            PhoneNumber: phoneNumber,
            CallBackURL: "https://roofa.co.ke/api/payments/callback",
            AccountReference: fullName,
            TransactionDesc: "Booking rental Payment",
        },
        {
            headers: {
                "Authorization": auth,
            }
        })

        
        //check if the transaction is initiated successfully
        if(response.data.ResponseCode != "0") {
            return NextResponse.json(
                {message: "Transaction failed. Try again"},
                {status: 500}
              )
        }

        await createNewBooking({
            MerchantRequestID: response.data.MerchantRequestID,
            apartmentBooked: rentalId as unknown as ObjectId,
            email: email,
            fullName: fullName, 
            reportingDate: reportingDate, 
            identityNumber: identityNumber, 
            gender: gender,
        })

    return NextResponse.json(
        {message: "Request accepted for processing. Complete payment", id: response.data.MerchantRequestID},
        {status: 200}
      )

    } catch(error: any) {
        return NextResponse.json(
            { message: "An error occurred while initiating transaction. Retry" + error.message },
            { status: 500 }
          );
    }
}