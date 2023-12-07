import Link from "next/link"

const BookingCard = ({ availableRooms} : { availableRooms: number}) => {
  return (
    <div className="fixed bottom-4 right-1 shadow rounded-lg bg-white p-3">
      {availableRooms >= 1 && (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-base1-semibold mb-3">House available for booking</span>
          <span className="text-small-medium mb-3">Available rooms:</span>
          <span className="text-body1-bold mb-4">{availableRooms}</span>

          <Link
          href={`/`}
          className="bg-blue p-3 w-full text-center rounded text-slate-200"
          >
            Reserve
          </Link>
        </div>
      )}
    </div>
  )
}

export default BookingCard
