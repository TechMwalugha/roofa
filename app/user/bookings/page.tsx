import Warning from "@/components/shared/alerts/Warning"
import { fetchUserBookings } from "@/lib/actions/user.actions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import HorizontalLine from "@/components/shared/utils/HorizontalLine"
import BookingTabs from "@/components/cards/BookingTabs"


const page = async () => {

    const sessionUser = await getServerSession()

    //user not login in
    if (!sessionUser) redirect('/login')
    
    const user: any = await fetchUserBookings({email: sessionUser.user?.email as string})

    const isConfirmedBooking = user.bookings.filter((booking: any) => {
        if(!booking.isBookingSettled && booking.isPaymentMade.isMade) {
            return {
                fullName: booking.fullName,
                email: booking.email,
                reportingDate: booking.reportingDate,
                identityNumber: booking.identityNumber,
                gender:  booking.gender,
                isBookingSettled: booking.isBookingSettled,
                createdAt: booking.createdAt,
                isPaymentMade: {
                    isMade: booking.isPaymentMade.isMade,
                    reason: booking.isPaymentMade.reason,
                },
                MerchantRequestID: booking.MerchantRequestID,
                apartmentBooked: booking.apartmentBooked,
            }
        }
    })
    const isNotConfirmedBooking = user.bookings.filter((booking: any) => {
    if(!booking.isBookingSettled && !booking.isPaymentMade.isMade) {
        return {
            fullName: booking.fullName,
            email: booking.email,
            reportingDate: booking.reportingDate,
            identityNumber: booking.identityNumber,
            gender:  booking.gender,
            isBookingSettled: booking.isBookingSettled,
            createdAt: booking.createdAt,
            isPaymentMade: {
                isMade: booking.isPaymentMade.isMade,
                reason: booking.isPaymentMade.reason,
            },
            MerchantRequestID: booking.MerchantRequestID,
            apartmentBooked: booking.apartmentBooked,
        }
    }
}
    )
    const isSettledBooking = user.bookings.filter((booking: any) => {
        if(booking.isBookingSettled && booking.isPaymentMade.isMade) {
            return {
                fullName: booking.fullName,
                email: booking.email,
                reportingDate: booking.reportingDate,
                identityNumber: booking.identityNumber,
                gender:  booking.gender,
                isBookingSettled: booking.isBookingSettled,
                createdAt: booking.createdAt,
                isPaymentMade: {
                    isMade: booking.isPaymentMade.isMade,
                    reason: booking.isPaymentMade.reason,
                },
                MerchantRequestID: booking.MerchantRequestID,
                apartmentBooked: booking.apartmentBooked,
            }
        }
    })

    if(!user) return

    if(user.payments.length > 0) {
 
        if(isConfirmedBooking.length > 0) {
            isConfirmedBooking.forEach((booking: any) => {
                const payment = user.payments.find((payment: any) => payment.MerchantRequestID === booking.MerchantRequestID)
    
                if(payment) {
                    // Convert Mongoose document to plain JavaScript object
                // const paymentObject = payment.toObject();
                    // Create a new object to merge initial booking values and payment details
                const mergedBooking = { ...booking, paymentDetails: payment };
    
                    // Replace the existing booking object with the merged one
                isConfirmedBooking[isConfirmedBooking.indexOf(booking)] = mergedBooking;
                }
            })
        }

        if(isSettledBooking.length > 0) {
            isSettledBooking.forEach((booking: any) => {
                const payment = user.payments.find((payment: any) => payment.MerchantRequestID === booking.MerchantRequestID)
    
                if(payment) {
                    // Create a new object to merge initial booking values and payment details
                const mergedBooking = { ...booking, paymentDetails: JSON.parse(JSON.stringify(payment)) };
    
                    // Replace the existing booking object with the merged one
                isSettledBooking[isSettledBooking.indexOf(booking)] = mergedBooking;
                }
            })
        }
    

    }

  return (
    <div className="lg:px-28 p-4">
      
      <section className="p-2">
            <div>
                <h2 className="text-heading3-bold text-center">Bookings</h2>

                <p className="text-small-regular">Dear, <span className="text-green-500 capitalize"> {user.name} </span>
                this are your bookings. If you made a booking and it is not listed here please contact us.
                </p>

                <div className="mt-5">
                    <Warning 
                    subject="This is a Booking alert"
                    content="Note that there categories of booking. One which is not yet confirmed by Roofa Customer Team Support another which the user requested a booking but did not make the payment and the last which is a booking which has been settled by both parties."
                    viewMoreUrl="/contact-us"
                    />
                </div>
            </div>

            <div>
                {
                        <BookingTabs 
                        isNotConfirmedBooking = {JSON.parse(JSON.stringify(isNotConfirmedBooking))}
                        isConfirmedBooking = {JSON.parse(JSON.stringify(isConfirmedBooking))}
                        isSettledBooking = {JSON.parse(JSON.stringify(isSettledBooking))}
                        />
                    
                }

                
            </div>

        </section>

      {
            user  && user.bookings.length == 0 && (<div className="flex flex-wrap items-center justify-center flex-col py-10">
            <h4 className="text-heading3-bold">No Bookings found</h4>
            <p className="text-subtle-medium">
                Make a booking today ! 
                <a href="/" className="text-blue">Book</a>
            </p>
        </div>)
        }
    </div>
  )
}

export default page
