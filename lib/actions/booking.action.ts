import { createBookingInterface } from "@/interfaces";
import { connectToDB } from "../mongoose";
import Booking from "../models/booking.model";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "./user.actions";
import User from "../models/user.model";
import { ObjectId } from "mongoose";
import Rental from "../models/rental.model";

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

        const userId = await User.findOne({email: session?.user?.email as string}).select('_id')
        let bookedBy: (ObjectId | null)

        if (session) {
            bookedBy = userId._id
        } else {
            bookedBy = null
        }
        

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

export async function fetchOneBooking(id: string) {
    try {
        connectToDB()

        const booking = await Booking.findOne({ MerchantRequestID: id })
        .populate({
            path: "bookedBy",
            model: User
        })
        .populate({
            path: "apartmentBooked",
            model: Rental
        })

        return booking
        
    } catch (error: any) {
        throw new Error(`An error occurred fetching rental: ${error.message}`)
    }
}