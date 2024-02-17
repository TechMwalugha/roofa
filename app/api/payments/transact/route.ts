
import { getAccessToken } from "@/lib/actions/payment.action";
import { NextResponse } from "next/server";
import moment from 'moment'
import axios from "axios";
import { createNewBooking } from "@/lib/actions/booking.action";

export async function POST(req: any) {
    try {
        const { 
            email, 
            fullName, 
            reportingDate, 
            mpesaPhoneNumber,
            identityNumber,
            gender,
            rentalId
         } = await req.json();

        const token = await getAccessToken()

        if(!token) return NextResponse.json(
        {message: "Transaction failed. Try again"},
        {status: 500}
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
            PhoneNumber: "254717355181",
            CallBackURL: "https://roofa-git-master-techmwalughas-projects.vercel.app/api/payments/callback",
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
            apartmentBooked: rentalId,
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