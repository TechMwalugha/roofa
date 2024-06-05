import RentalFormDetails from "@/components/admin/forms/RentalFormDetails"
import { fetchUsersNotAgents } from "@/lib/actions/user.actions"
import Rental from "@/lib/models/rental.model"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { checkWhetherIsAgentOrAdmin } from "@/lib/utils"
import mongoose, { ObjectId } from "mongoose"

const page = async ({ params } : { params: { id: ObjectId}}) => {


  let rentalDetails
  try{
    connectToDB()
    rentalDetails = await Rental.findById(params.id)
    .populate({
     path: 'rentalsNear',
     model: Rental,
     select: 'title location'
    }).populate({
     path: 'owner',
     model: User,
     select: 'name image'
   })

  } catch (err: any) {
    throw new Error(`unable to fetch rentals: ${err.message}`)
  }

  const rentalsNear = rentalDetails.rentalsNear.map((rental: {_id: mongoose.Schema.Types.ObjectId, title: string, location: string}) => {
    return {
      _id: rental._id.toString(),
      title: rental.title,
      location: rental.location
    }
  })

   if(!rentalDetails) return

   let allRentals = await fetchTotalRentals(params.id)

   allRentals = allRentals.map((rental: {_id: mongoose.Schema.Types.ObjectId, title: string, location: string}) => {
    return {
      _id: rental._id.toString(),
      title: rental.title,
      location: rental.location
    }
  })

  let rentalBookings = rentalDetails.bookings.map((rental: mongoose.Schema.Types.ObjectId) => rental.toString())


   const users = await fetchUsersNotAgents()
   
   if(!users) return

   const updatedUsers = users.map((user) => {

    return {
      _id: (user._id as ObjectId).toString(),
      name: user.name,
      email:user.email,
      image: user.image
    }
  })

  
  return (
    <div>
      
      <RentalFormDetails
      rentalId={rentalDetails._id.toString()}
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
      rentalOffers = {rentalDetails.rentalOffers}
      availableRooms = {rentalDetails.availableRooms}
      rentalsNear = {rentalsNear}
      bookings = {rentalBookings}
      rentalStatus = {rentalDetails.rentalStatus}
      createdAt = {rentalDetails.createdAt}
      updatedAt = {rentalDetails.updatedAt}
      serviceFee = {{ paidBy: rentalDetails.serviceFee.paidBy, amount: rentalDetails.serviceFee.amount }}
      allRentals={allRentals}
      users={updatedUsers}
      owner={rentalDetails.owner?._id.toString()}
      />
    </div>
  )
}

export default page

async function fetchTotalRentals(id: ObjectId) {
  let rentals
  try {
    const results = await Rental.find({ _id: { $ne: id }}).select('title location')

   rentals = results.map((result) => {
    return {
      _id: result._id.toString(),
      title: result.title,
      location: result.location
    }
  })
  } catch (error: any) {
    throw new Error(`could not fetch rentals : ${error.message}`)
  }
  return rentals
}
