import TableCon from "@/components/admin/cards/Table"
import { dashboardAction } from "@/lib/actions/all.action";
import { checkWhetherIsAgentOrAdmin, formatDateString } from "@/lib/utils"
import { GoUnverified } from "react-icons/go";
import { BsHouseHeartFill } from "react-icons/bs";
import { CiBookmarkMinus } from "react-icons/ci";
import Link from "next/link";


const page = async () => {


  const dateNow: any = Date.now()

  const result = await dashboardAction()
  
  return (
    <div className="">
        <h1 className="text-2xl font-bold text-heading2-semibold">Dashboard</h1>
        <p className="p-2 mb-2 inline-block bg-teal-200">{formatDateString(dateNow)}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2 cursor-pointer">
            <div className="flex items-center gap-2">
            <CiBookmarkMinus size={30} />
            <p className="text-base1-semibold capitalize">Unsettled bookings</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              {result?.unsettledBooking.length}
            </h3>
          </div>
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2 cursor-pointer">
            <div className="flex items-center gap-2">
            <GoUnverified size={30} />
            <p className="text-base1-semibold capitalize">Unverified users</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              {result?.unverifiedUsers}
            </h3>
          </div>
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2 cursor-pointer">
            <div className="flex items-center gap-2">
            <BsHouseHeartFill size={30} />
            <p className="text-base1-semibold capitalize">Total rentals</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              {result?.totalRentals}
            </h3>
          </div>
        </div>
        <hr className="my-5" />

        <h1 className="text-2xl font-bold text-body-bold">Recent Bookings</h1>
        <p
        className="text-subtle-medium"
        >
          Please settle this bookings as soon as possible.
        </p>
        <section className="shadow-lg  mt-2">
        {
         result?.unsettledBooking && result?.unsettledBooking.map((booking: any, index: number) => {
            booking.isPaymentMade ? booking.isPaymentMade : booking.isPaymentMade = { isMade: false, amount: 0 }
            return (
              <Link key={booking._id} href={`/admin/bookings/${booking._id.toString()}`} className={`flex items-center justify-between flex-wrap shadow-md p-3 rounded mb-3 hover:shadow-groups ${(booking.isBookingSettled && booking.isPaymentMade.isMade) ? 'bg-blue' : ''} ${(!booking.isBookingSettled && booking.isPaymentMade.isMade) ? 'bg-warning' : ''}`}>
                <div className="text-subtle-medium">
                  <h6>Booked by: <span className="text-gray-400 capitalize">{booking.fullName}</span></h6>
                  <p>Email: <span className="text-gray-400"> {booking.email}</span></p>
                  <p>Identity Number <span className="text-gray-400">{booking.identityNumber}</span></p>
                  <span>{formatDateString(booking.createdAt as string)}</span>
                </div>
  
                <div className="mt-4 sm:mt-0">
                  <p className={`text-tiny-medium ${booking.isBookingSettled ? 'bg-green-400' : 'bg-danger'} p-1 rounded mb-2`}>{booking.isBookingSettled ? 'Booking settled ✔️' : 'This booking has not been completed ❎'}</p>
                  <p className={`text-tiny-medium ${booking.isPaymentMade.isMade ? 'bg-green-400' : 'bg-danger'} p-1 rounded`}>{booking.isPaymentMade.isMade ? 'Payment confirmed ✔️' : 'This booking payment is NOT confirmed! ❎'}</p>
                </div>
          </Link>
            )
          }
        )
        }
        </section>
    </div>
  )
}

export default page
