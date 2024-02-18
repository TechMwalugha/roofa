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

    const isConfirmedBooking = user.bookings.some((booking: any) => !booking.isBookingSettled && booking.isPaymentMade.isMade)
    const isNotConfirmedBooking = user.bookings.some((booking: any) => !booking.isBookingSettled)
    const isSettledBooking = user.bookings.some((booking: any) => booking.isBookingSettled && booking.isPaymentMade.isMade)

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
                    user.bookings.length > 0 && user.bookings.map((booking: any, index: number) => {
                        let type: (string | null) = null
                        let mpesaReceiptNumber: (string | null) = null 
                        let amount: (number | null) = null
                        let paymentMadeOn: (string | null) = null 
                        let mpesaPhoneNumber: (string | null) = null
                        if(booking.isPaymentMade.isMade && user.payments.length > 0) {
                            const payment = user.payments.filter((payment: any) => payment.MerchantRequestID === booking.MerchantRequestID);
                            
                            type = payment[0].typeOfPayment
                            mpesaReceiptNumber = payment[0].mpesaReceiptNumber
                            amount = payment[0].amount
                            paymentMadeOn = payment[0].createdAt as unknown as string
                            mpesaPhoneNumber = payment[0].mpesaPhoneNumber
                        }
                     return (
                        <BookingTabs 
                        key={index}
                        fullName = {booking.fullName}
                        email ={booking.email}
                        reportingDate ={booking.reportingDate}
                        identityNumber = {booking.identityNumber}
                        gender ={booking.gender}
                        isBookingSettled ={booking.isBookingSettled}
                        createdAt = {booking.createdAt as unknown as string}
                        isPaymentMade = {{ 
                            isMade: booking.isPaymentMade.isMade,
                            reason: booking.isPaymentMade.reason 
                        }}
                        apartmentTitle = {booking.apartmentBooked.title}
                        apartmentLocation = {booking.apartmentBooked.location}
                        apartmentPrice = {booking.apartmentBooked.price}
                        apartmentImage = {booking.apartmentBooked.images[0]}
                        type = {type}
                        mpesaReceiptNumber = {mpesaReceiptNumber}
                        amount = {amount}
                        paymentMadeOn = {paymentMadeOn}
                        mpesaPhoneNumber = {mpesaPhoneNumber}
                        isNotConfirmedBooking = {isNotConfirmedBooking}
                        isConfirmedBooking = {isConfirmedBooking}
                        isSettledBooking = {isSettledBooking}
                        />
                    ) })
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
