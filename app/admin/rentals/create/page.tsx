import CreateRental from "@/components/admin/forms/CreateRental"
import Rental from "@/lib/models/rental.model"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { ObjectId } from "mongoose"
import { getServerSession } from "next-auth"


const page = async () => {
  const session = await getServerSession()

  const users: any = await fetchUsers(session?.user?.email as string)
 
  const rentalResults = await Rental.find({}).select('title location')

 const  allRentals=rentalResults.map((rental: any) => {
    
    return {
      _id: rental._id.toString(),
      title: rental.title,
      location: rental.location
    }
  })

  return (
    <div>
      create
      <CreateRental
        users={users.map((user: any) => {
          user._id = (user._id as ObjectId).toString()

          return user
        })}

        allRentals={allRentals}

      />
    </div>
  )
}


async function fetchUsers(userEmail: string) {
  try{
    connectToDB()
  return await User.find({
    email: { $ne: userEmail },
    $and: [ {role: { $ne: 'roofa-agent'} }, { role: { $ne: 'admin'}}]
  }).select("name email image").lean().sort({ createdAt: "desc"})


  } catch(error: any) {
    throw new Error(`${error.message}`)
  }
}
export default page
