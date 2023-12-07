import Link from "next/link"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  
const BookingCard = ({ availableRooms} : { availableRooms: number}) => {
  return (
    <Popover>
        <PopoverTrigger 
        className="fixed bottom-3 right-2 bg-blue p-6 rounded-lg shadow hover:text-white transition-all"
        >check availability</PopoverTrigger>
        <PopoverContent className="block">
            { availableRooms >= 1 && (
                <div className="">
                    <p className="text-heading3-bold">Available</p>
                    <p className="text-small-medium mb-3">Reserve this place today</p>
                    <Link 
                    href={""} 
                    className="text-small-medium block w-full bg-danger p-3 rounded-md text-center">Reserve</Link>
                </div>
            )}

            { availableRooms < 1 && (
                <p className="text-small-semibold mb-3">Opps! the rental is full. <br /> check houses near ⬇️</p>
            )}
        </PopoverContent>
    </Popover>

  )
}

export default BookingCard
