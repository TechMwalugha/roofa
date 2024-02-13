import { createBookingInterface } from "@/interfaces";
import { connectToDB } from "../mongoose";
import Booking from "../models/booking.model";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "./user.actions";
import User from "../models/user.model";
import { ObjectId } from "mongoose";

export async function createNewBooking({
    MerchantRequestID,
    apartmentBooked,
    email,
    fullName, 
    reportingDate, 
    identityNumber, 
    gender,
}: createBookingInterface) {
    try {
        connectToDB()

        const session = await getServerSession()

        if(!session) return

        const userId = await User.find({email: session?.user?.email as string}).select('_id')
        const bookedBy: ObjectId = userId[0]._id

        

        const booking = new Booking({
            MerchantRequestID,
            bookedBy,
            apartmentBooked,
            email,
            fullName, 
            reportingDate, 
            identityNumber, 
            gender,
        })

     await booking.save();
        
    } catch (error: any) {
        throw new Error(`Unable to create new booking: ${error.message}`)
    }

}

export async function updateBookingOnPayment({
    MerchantRequestID,
    isPayment,
    isPaymentReason,
}: {
    MerchantRequestID: string;
    isPayment: boolean;
    isPaymentReason: string;
}) {
    try {
        connectToDB()

        const booking = await Booking.find({MerchantRequestID: MerchantRequestID})

        booking[0].isPaymentMade = {
            isMade: isPayment,
            reason: isPaymentReason,
        }

        await booking[0].save()
        
    } catch (error: any) {
        throw new Error(`unable to update booking: ${error.message}`)
        
    }
}