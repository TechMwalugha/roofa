
import { getAccessToken } from "@/lib/actions/payment.action";
import { NextResponse } from "next/server";
import moment from 'moment'
import axios from "axios";
import { createNewBooking } from "@/lib/actions/booking.action";
import { retrieveRentalPrice } from "@/lib/actions/rental.action";

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