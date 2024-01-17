import RentalFormDetails from "@/components/admin/forms/RentalFormDetails"
import { fetchSingleRental } from "@/lib/actions/rental.action"
import { ObjectId } from "mongoose"

const page = async ({ params } : { params: { id: ObjectId}}) => {

   const rentalDetails = await fetchSingleRental({id: params.id})

   if(!rentalDetails) return

  return (
    <div>
      
      <RentalFormDetails
      title={rentalDetails.title}
      description={rentalDetails.description}
      rentalType = {rentalDetails.rentalType}
      price = {rentalDetails.price}
      location = {rentalDetails.location}
      images = {rentalDetails.images}
      amenities = {rentalDetails.amenities}
      geoLocation = {
        {
          name: rentalDetails.geoLocation.name, 
          address: rentalDetails.geoLocation.address, 
          latitude: rentalDetails.geoLocation.latitude,
          longitude: rentalDetails.geoLocation.longitude
        }
      }
      rentalRules = {rentalDetails.rentalRules}
      availableRooms = {rentalDetails.availableRooms}
      rentalsNear = {rentalDetails.rentalNear}
      bookings = {rentalDetails.bookings}
      rentalStatus = {rentalDetails.rentalStatus}
      createdAt = {rentalDetails.createdAt}
      updatedAt = {rentalDetails.updatedAt}
      serviceFee = {{ paidBy: rentalDetails.serviceFee.paidBy, amount: rentalDetails.serviceFee.amount }}
      />
    </div>
  )
}

export default page
