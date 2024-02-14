import { updateBookingOnPayment } from "@/lib/actions/booking.action";
import { createPayment } from "@/lib/actions/payment.action";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
        const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
        const resultCode = req.body.Body.stkCallback.ResultCode;
        const resultDesc = req.body.Body.stkCallback.ResultDesc;
        const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
        const amount = callbackMetadata.Item[0].Value;
        const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
        const transactionDate = callbackMetadata.Item[3].Value;
        const phoneNumber = callbackMetadata.Item[4].Value;

        if(resultCode !== '0') {

          await updateBookingOnPayment({
            MerchantRequestID: merchantRequestID,
            isPayment: false,
            isPaymentReason: resultDesc,
          })

        }

        await updateBookingOnPayment({
          MerchantRequestID: merchantRequestID,
          isPayment: true,
          isPaymentReason: resultDesc,
        })

        await createPayment({
          MerchantRequestID: merchantRequestID,
          CheckoutRequestID: checkoutRequestID,
          ResultCode: resultCode,
          ResultDesc: resultDesc,
          amount: amount,
          mpesaReceiptNumber: mpesaReceiptNumber,
          transactionDate: transactionDate,
          mpesaPhoneNumber: phoneNumber,
          typeOfPayment: 'Rental',
        })

          
          return NextResponse.json(
            {message: "Check email, Link sent"},
            {status: 300}
          )

    } catch(error: any) {
      console.log(error.message)
        return NextResponse.json(
            { message: "An error occurred while receiving the callback. retry" },
            { status: 500 }
          );
    }
}