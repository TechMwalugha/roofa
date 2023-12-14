import { ObjectId } from "mongoose"
import BookingDetailsForm from "../forms/BookingDetailsForm"


const BookingDetails = ({
    id
}: {
    id: ObjectId
}) => {
  return (
    <div>
      <BookingDetailsForm />
      
    </div>
  )
}

export default BookingDetails
