import DeleteUser from "@/components/admin/cards/DeleteUser"
import UserToAgent from "@/components/admin/cards/UserToAgent"
import CollapsibleCon from "@/components/cards/Collapsible"
import HorizontalLine from "@/components/shared/utils/HorizontalLine"
import { fetchUserByEmail, fetchUserById, fetchUserNotification } from "@/lib/actions/user.actions"
import { formatDateString } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth";
import SuspendUser from "@/components/admin/cards/SuspendUser"
import Notification from "@/lib/models/notification.model"
import { ObjectId } from "mongoose"
import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/models/user.model"


const page = async ({
  params
}: {
  params: {
    id: string
  }
}) => {
  const session = await getServerSession()

  if(!session) {
    redirect('/not-found')
  }

  const sessionUser = await fetchUserByEmail(session?.user?.email as string)

  if(!sessionUser) {
    redirect('/not-found')
  }

  let isAllowed: boolean =  sessionUser.role === 'roofa-agent' || sessionUser.role === 'admin' ? true : false

  if(!isAllowed) {
    redirect('/not-found')
  }


  const user = await fetchUserNotification(params.id as any)



  if(!user) {
    redirect('/admin/users')
  }

  return (
    <section>
      <div className="flex items-center gap-3 text-primary mb-4">
        <Link 
        href="/"
        >Home</Link>
        {'>'} 
        <Link 
        href="/admin/users"
        className="underline"
        >user</Link>
      </div>
      <div className="p-3 shadow-groups" >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image 
            src={user.image}
            width={45}
            height={45}
            alt="user image"
            className="rounded-full object-cover w-16 h-16"
            />
            <div>
              <h3 className="text-base-regular capitalize">{user.name}</h3>
              <p className="text-subtle-medium lowercase">{user.email}</p>
            </div>
          </div>

          <div>
            {user.accountStatus && user.isEmailVerified && (
              <Image 
              src="/assets/verified-image.png"
              width={45}
              height={45}
              alt="verification image"
              className="rounded-full object-cover w-16 h-16"
              />
            )}

           {!user.accountStatus && !user.isEmailVerified && (
              <Image 
              src="/assets/unverified-image.jpg"
              width={45}
              height={45}
              alt="verification image"
              className="rounded-full object-cover w-16 h-16"
              />
            )}
          </div>
        </div>
          <h3 
          className="flex items-center justify-between mt-4 text-subtle-medium">
            <span>Joined on: {formatDateString(user.createdAt)}</span>
            <span>Updated at: {formatDateString(user.updatedAt)}</span>
          </h3>

          {
            user.role === 'roofa-agent' && (
              <Image 
              src="/assets/roofa-agent-cartoon-image.png"
              width={45}
              height={45}
              alt="agent"
              className="rounded-full object-cover w-16 h-16 mx-auto"
              />
            )
          }

          {
            !user.isEmailVerified && (
                <p className="text-subtle-medium p-3 bg-danger rounded-sm"> Email is not verified: <br/>
                check email if its sensible or if updated at is over a month, remove this account.
                </p>
            )
          }

          {
            !user.accountStatus && (
              <p className="text-subtle-medium p-3 bg-danger rounded-sm mt-2"> Account is suspended: <br/>
                Reason: check email if its sensible or if updated at is over a month, remove this account.
              </p>
            )
          }

          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
          <DeleteUser
          id={user.id}
           />
           <SuspendUser
            id={user.id}
            accountStatus = {user.accountStatus}
           />

           { sessionUser.role === 'admin' && (
            <UserToAgent
            id={user.id}
            role={user.role}
            />
           )}
          </div>

      <HorizontalLine />

      <div>
      <CollapsibleCon 
      title="Bookings"
      content = {
        []
      }
      userId = {user._id}
      />

     <CollapsibleCon 
      title="Notifications"
      content = {user.notifications}
      userId = {user._id}
      />

    <CollapsibleCon 
      title="Rental History"
      content = {
        []
      }
      userId = {user._id}
      />
      </div>
      </div>
    </section>
  )
}

export default page



