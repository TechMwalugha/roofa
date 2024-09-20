import Link from "next/link"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ObjectId } from "mongoose"

  
const BookingCard = ({ availableRooms, id} : { availableRooms: number, id: ObjectId}) => {
  return (
    <Popover>
        <PopoverTrigger 
        className="w-full mb-5 bg-blue p-6 rounded-lg shadow hover:text-white transition-all"
        >check availability</PopoverTrigger>
        <PopoverContent className="block">
            { availableRooms >= 1 && (
                <div className="">
                    <p className="text-heading3-bold">Available</p>
                    <p className="text-small-medium mb-3">Reserve this place today</p>
                    <Link 
                    href={`/rentals/book/${id}`}
                    className="text-small-medium block w-full bg-danger p-3 rounded-md text-center">Reserve</Link>
                </div>
            )}

            { availableRooms < 1 && (
                <div className="text-center">
                  <h5 className="mb-2">Opps!</h5>
                   <p className="text-small-semibold">The Apartment is full. Explore other options below ⬇️</p>
                </div>
            )}
        </PopoverContent>
    </Popover>

  )
}

export default BookingCard
