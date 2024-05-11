import SearchUser from "@/components/admin/forms/SearchUser";
import Pagination from "@/components/shared/Pagination";
import { fetchAllBookings } from "@/lib/actions/booking.action"
import { formatDateString } from "@/lib/utils";
import Link from "next/link";
import { CiBookmarkMinus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiBookmarkRemove } from "react-icons/ci";

const page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined
  }
}) => {

  const result: any = await fetchAllBookings({
    searchString: searchParams?.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 20,
  })

  console.log(result)
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className=" flex items-center justify-between p-2 flex-auto w-[300px] cursor-pointer rounded shadow hover:shadow-count transition-all delay-2000">
          <div>
            <h4 className="bg-warning inline-flex p-2 rounded-full mb-4"><CiBookmarkMinus size={34} /></h4>
            <h5 className="text-heading3-bold">Pending</h5>
          </div>
          <div>
            <h4 className="text-heading1-bold">{result.pendingBooking}</h4>
          </div>
        </div>

        <div className=" flex items-center justify-between p-2 flex-auto w-[300px] cursor-pointer rounded shadow hover:shadow-count transition-all delay-2000">
          <div>
            <h4 className="bg-green-500 inline-flex p-2 rounded-full mb-4"><CiBookmarkCheck size={34} /></h4>
            <h5 className="text-heading3-bold">Completed</h5>
          </div>
          <div>
            <h4 className="text-heading1-bold">{result.settledBooking}</h4>
          </div>
        </div>

        <div className=" flex items-center justify-between p-2 flex-auto w-[300px] cursor-pointer rounded shadow hover:shadow-count transition-all delay-2000">
          <div>
            <h4 className="bg-red-500 inline-flex p-2 rounded-full mb-4"><CiBookmarkRemove size={34} /></h4>
            <h5 className="text-heading3-bold">Failed</h5>
          </div>
          <div>
            <h4 className="text-heading1-bold">{result.failedBooking}</h4>
          </div>
        </div>
      </div>

      {/* displaying all bookings */}
      <div className="my-5">
        <h2 className="text-center text-heading3-bold">All Bookings</h2>

        <div className="max-sm:w-full mb-4">
                <SearchUser 
                routeType="bookings"
                />
            </div>
        {
          result.bookings.map((booking: any, index: number) => (
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
          ))
        }

          <Pagination
            path='bookings'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
            />
      </div>
    </div>
  )
}

export default page
