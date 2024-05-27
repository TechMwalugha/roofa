import { checkBookingExistsById, updateBookingOnPayment } from "@/lib/actions/booking.action";
import { createPayment } from "@/lib/actions/payment.action";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
      const body = await req.json() 


      if(!body.Body) return NextResponse.json(
        { message: "Forbidden"},
        { status: 403 }
      );


        const merchantRequestID = body.Body.stkCallback.MerchantRequestID;
        const checkoutRequestID = body.Body.stkCallback.CheckoutRequestID;
        const resultCode = body.Body.stkCallback.ResultCode;
        const resultDesc = body.Body.stkCallback.ResultDesc;


      const paymentExists = await checkBookingExistsById({ merchantRequestID: merchantRequestID})

      if(!paymentExists) return NextResponse.json(
        { message: "Forbidden."},
        { status: 403 }
      );
      
        if(resultCode === 0) {
          const callbackMetadata = body.Body.stkCallback.CallbackMetadata;
          const amount = callbackMetadata.Item[0].Value;
          const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
          const transactionDate = callbackMetadata.Item[3].Value;
          const phoneNumber = callbackMetadata.Item[4].Value;

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

          await updateBookingOnPayment({
            MerchantRequestID: merchantRequestID,
            isPayment: true,
            isPaymentReason: resultDesc,
          })
        

          
          return NextResponse.json(
            {message: "payment made successfully. Thank you for booking with us. We will get back to you soon."},
            {status: 200}
          )
          
        }
        
        
        // failed transaction
        await updateBookingOnPayment({
          MerchantRequestID: merchantRequestID,
          isPayment: false,
          isPaymentReason: resultDesc,
        })
        
        return NextResponse.json(
            {message: "Transaction failed."},
            {status: 200}
          )

    } catch(error: any) {
      console.log(error.message)
        return NextResponse.json(
            { message: "An error occurred while receiving the callback. retry"},
            { status: 500 }
          );
    }
}