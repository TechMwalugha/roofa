import { ObjectId } from "mongoose"
import BookingDetailsForm from "../forms/BookingDetailsForm"
import { getServerSession } from "next-auth"



const BookingDetails = async ({
    id
}: {
    id: ObjectId
}) => {



    const session = await getServerSession()

    

  return (
    <div
    className="flex items-center justify-center"
    >
      <BookingDetailsForm 
      email={session?.user?.email as string}
      name={session?.user?.name as string}
      rentalId={id.toString()}
      />
      
    </div>
  )
}

export default BookingDetails

