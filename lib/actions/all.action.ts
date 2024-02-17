import generatePdf from "../emailing/pdf"
import { connectToDB } from "../mongoose"
import { fetchOneBooking } from "./booking.action"
import { fetchOnePayment } from "./payment.action"

export async function regenerateReceipt({ id }: { id: string }) {
    try {
        connectToDB()

        const booking = await fetchOneBooking(id)
        const payment: any = await fetchOnePayment({ id: id})

        if(booking && booking.isPaymentMade.isMade && !booking.isBookingSettled && payment) {
            await generatePdf({
                receiptNo: payment._id.toString(),
                date: new Date(),
                name: booking.fullName,
                email: booking.email,
                identityNumber: booking.identityNumber,
                gender: booking.gender,
                reportingDate: booking.reportingDate,
                apartmentName: booking.apartmentBooked.title,
                apartmentLocation: booking.apartmentBooked.location,
                apartmentPrice: booking.apartmentBooked.price,
                mpesaReciptNumber: payment.mpesaReceiptNumber,
                transactionDate: payment.transactionDate,
                mpesaPhoneNumber: payment.mpesaPhoneNumber,
                amountPaid: payment.amount,
                })
            return true
        }

        return false

    } catch (error: any) {
        console.log(error.message)
    }
}