'use server'

import { createBookingInterface } from "@/interfaces";
import { connectToDB } from "../mongoose";
import Booking from "../models/booking.model";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "./user.actions";
import User from "../models/user.model";
import { FilterQuery, ObjectId, SortOrder } from "mongoose";
import Rental from "../models/rental.model";
import Payment from "../models/payment.model";
import sendEmail from "../emailing/nodemailer.email";

export async function createNewBooking({
    MerchantRequestID,
    apartmentBooked,
    email,
    fullName, 
    reportingDate, 
    identityNumber, 
    gender,
    mpesaPhoneNumber
}: createBookingInterface) {
    try {
        connectToDB()

        const session = await getServerSession()

        const userId = await User.findOne({email: session?.user?.email as string}).select('_id bookings')
        let bookedBy: (ObjectId | null)

        if (userId) {
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
            mpesaPhoneNumber
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

        if(booking[0].bookedBy) {
            const user = await User.findById(booking[0].bookedBy)
            .select('bookings payments')

            if(user) {

                if(isPayment) {
                    const payment = await Payment.findOne({MerchantRequestID: MerchantRequestID})
                .select('_id')
                payment ? user.payments.push(payment._id) : null
                }

                user.bookings.push(booking[0]._id)
                await user.save()

            }

        }

        if(booking[0].apartmentBooked) {
            const rental = await Rental.findById(booking[0].apartmentBooked)
            .select('bookings')
            if(rental) {
                rental.bookings.push(booking[0]._id)
                await rental.save()
            }
        }

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

export async function fetchOneBookingId({ id }: { id: string } ) {
    try{
        connectToDB()

        const booking = await Booking.findById(id as unknown as ObjectId)
        .populate({
            path: "bookedBy",
            model: User
        })
        .populate({
            path: "apartmentBooked",
            model: Rental
        })

        return booking

    } catch(error: any) {
        throw new Error(`Cannot fetch the booking ${error.message}`)
    }
}

export async function fetchAllBookings({
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
  }) {
    try {
      connectToDB();
  
      // Calculate the number of users to skip based on the page number and page size.
      const skipAmount = (pageNumber - 1) * pageSize;
  
      // Create a case-insensitive regular expression for the provided search string.
      const regex = new RegExp(searchString, "i");
  
      // Create an initial query object to filter users.
      const query: FilterQuery<typeof Payment> = {
  
      };
  
      // If the search string is not empty, add the $or operator to match either name or email fields.
      if (searchString.trim() !== "") {
        query.$or = [
          { email: { $regex: regex } },
          { fullName: { $regex: regex } },
          { identityNumber: { $regex: regex } },
        ];
      }
  
      // Define the sort options for the fetched users based on createdAt field and provided sort order.
      const sortOptions = { createdAt: sortBy };
  
      const bookingsQuery: any = Booking.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)
  
      // Count the total number of booking that match the below criteria (without pagination).
      const totalBookingsCount = await Booking.countDocuments(query);
      const allBooking = await Booking.find(query)
      .select('isBookingSettled isPaymentMade')

      const pendingBooking = allBooking.filter((booking: any) => !booking.isBookingSettled && booking.isPaymentMade.isMade).length
      const settledBooking = allBooking.filter((booking: any) => booking.isBookingSettled && booking.isPaymentMade.isMade).length
      const failedBooking = allBooking.filter((booking: any) => !booking.isBookingSettled && !booking.isPaymentMade.isMade).length
  
      const bookings = await bookingsQuery.exec();
  
      // Check if there are more users beyond the current page.
      const isNext = totalBookingsCount > skipAmount + bookings.length;
  
      return { bookings, isNext, pendingBooking, settledBooking, failedBooking };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

export async function settleBookingAction({ id }: { id: ObjectId}) {
    try {
        connectToDB()
        
        const booking = await Booking.findById(id)
        .populate({
            path: "apartmentBooked",
            model: Rental,
            select: "title"
        })

        if(!booking) return false

      
        if(booking.isPaymentMade.isMade) {
            booking.isBookingSettled = !booking.isBookingSettled
        }


        const res = await sendEmail({
            email: booking.email, 
            subject: 'Roofa Reservations', 
            heading: `Booking Settled successfully.`, 
            content: `Dear <strong style="color: #67C1CA;">${booking.fullName}</strong> your booking for has been settled successfully.
            This means you have checked in to the apartment. Thank you for trusting in us. Have a nice stay in  <strong style="color: #67C1CA;">${booking.apartmentBooked.title}<strong/>
            <br/>
            <br/>
            Regards <br/>
            Roofa Reservations<br/>
            reservations@roofa.co.ke
            `, 
            pdfFilePath: null ,
        })

        if(res) await booking.save()

        return res
        
    } catch (error: any) {
        throw new Error(`Cannot update booking. ${error.message}`)
    }
}

export  async function checkBookingExistsById({merchantRequestID}: {merchantRequestID: string}) {
    try {
        // Use findOne() method to find a document with the given ID
        const booking = await Booking.findOne({ MerchantRequestID: merchantRequestID })
        // If no document is found, return false
        if(!booking) return false

        return true
    } catch (error) {
        console.error('Error checking document existence:', error);
        return false; // Error occurred, return false
    }
}