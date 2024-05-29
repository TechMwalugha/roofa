'use server'

import generatePdf from "../emailing/pdf"
import Booking from "../models/booking.model"
import Rental from "../models/rental.model"
import User from "../models/user.model"
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

export async function dashboardAction(){
    try {
        connectToDB()

      const allBooking = await Booking.find()
      .select('fullName email identityNumber isBookingSettled isPaymentMade createdAt')

      const unverifiedUsers = await User.find({isEmailVerified: false})
      const totalRentals = await Rental.countDocuments()

      const unsettledBooking = allBooking.filter((booking: any) => !booking.isBookingSettled && booking.isPaymentMade.isMade)

      return {
        unverifiedUsers: unverifiedUsers.length,
        totalRentals: totalRentals,
        unsettledBooking: unsettledBooking,
      }
    } catch (error: any) {
        console.log(error.message)
    }
}