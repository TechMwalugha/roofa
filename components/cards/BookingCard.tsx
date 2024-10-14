import Link from "next/link"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ObjectId } from "mongoose"
import { Button } from "../ui/button"

  
const BookingCard = ({ availableRooms, id} : { availableRooms: number, id: ObjectId}) => {
  return (
    <Button
    className={`p-0 w-full bg-blue ${availableRooms < 1 ? "text-[#000]" : ""}`}
    // disabled={availableRooms < 1 }
    >
      <Link 
      href={availableRooms < 1 ? "" : `/rentals/book/${id}`}
      className="w-full"
      >
      {availableRooms >= 1 ? "Reserve" : "Not Available"}
      </Link>
    </Button>

  )
}

export default BookingCard
