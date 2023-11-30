import CreateRental from "@/components/admin/forms/CreateRental"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { ObjectId } from "mongoose"
import { getServerSession } from "next-auth"


const page = async () => {
  const session = await getServerSession()
  const userEmail = session?.user?.email
  const users = await fetchUsers('nanana@gmail.com')
 

  return (
    <div>
      create
      <CreateRental
        users={users.map((user) => {
          user._id = (user._id as ObjectId).toString()
          return user
        })}
      />
    </div>
  )
}


async function fetchUsers(userEmail: string) {
  try{
    connectToDB()
  return await User.find({email: { $ne: userEmail }}).select("name email image").lean().sort({ createdAt: "desc"})


  } catch(error: any) {
    throw new Error(`${error.message}`)
  }
}
export default page
