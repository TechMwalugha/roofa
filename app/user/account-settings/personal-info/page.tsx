import Link from "next/link"
import { getServerSession } from "next-auth"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import PersonalInfo from "@/components/forms/PersonalInfo"
import UploadUserImageForm from "@/components/forms/UploadUserImageForm"

const page = async () => {

    const session = await getServerSession()

    if(!session) redirect('/login')

    const user = await fetchUserByEmail(session.user?.email as string)

    if(!user) redirect('/login')

      console.log(user.image)

  return (
    <div className="flex gap-4 items-center justify-between p-3 sm:p-7">
      <div className="md:flex flex-col gap-3 hidden self-start">
        <Link 
        href='account-settings'
        className="shadow p-3 rounded-md">
            <h3 className="font-bold">Account Setting</h3>
            <p className="text-small-medium font-normal">your account general settings</p>
        </Link>

        <Link 
        href='/user/notifications'
        className="shadow p-3 rounded-md">
            <h3 className="font-bold">Notifications</h3>
            <p className="text-small-medium font-normal">your account updates & info</p>
        </Link>

        <Link 
        href='/user/bookings'
        className="shadow p-3 rounded-md">
            <h3 className="font-bold">Bookings</h3>
            <p className="text-small-medium font-normal">your current roofa bookings</p>
        </Link>

        <Link 
        href='/user/account-settings'
        className="shadow p-3 rounded-md">
            <h3 className="font-bold">Rental history</h3>
            <p className="text-small-medium font-normal">your rental stayed history.</p>
        </Link>
      </div>
       
      <div className="flex-1 w-full">
      <UploadUserImageForm 
        id={user.id}
        image={user.image}
        createdAt={user.createdAt}
        />
        <PersonalInfo
            id={user.id}
            name = {user.name} 
            email = {user.email}
            image = {user.image}
            signInType = {user.signInType}
            isEmailVerified = {user.isEmailVerified}
            role = {user.role}
            accountStatus = {user.accountStatus}
        />
        </div>

    </div>
  )
}

export default page
