import CreateRental from "@/components/admin/forms/CreateRental"
import { fetchUsersNotAgents } from "@/lib/actions/user.actions"
import Rental from "@/lib/models/rental.model"
import { checkWhetherIsAgentOrAdmin } from "@/lib/utils"
import { ObjectId } from "mongoose"
import { getServerSession } from "next-auth"


const page = async () => {

  const users: any = await fetchUsersNotAgents()
 
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
      <h3 className="text-heading3-bold text-center">Create new rental</h3>
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


export default page
