import DeleteUser from "@/components/admin/cards/DeleteUser"
import CollapsibleCon from "@/components/cards/Collapsible"
import HorizontalLine from "@/components/shared/utils/HorizontalLine"
import { fetchUserById } from "@/lib/actions/user.actions"
import { formatDateString } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"


const page = async ({
  params
}: {
  params: {
    id: string
  }
}) => {

  const user = await fetchUserById(params.id as any)

  
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
            {user.accountStatus && (
              <Image 
              src="/assets/verified-image.png"
              width={45}
              height={45}
              alt="verification image"
              className="rounded-full object-cover w-16 h-16"
              />
            )}

           {!user.accountStatus && (
              <Image 
              src="/assets/unverified-image.png"
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
              <p className="text-subtle-medium p-3 bg-danger rounded-sm"> Account is suspended: <br/>
                Reason: check email if its sensible or if updated at is over a month, remove this account.
              </p>
            )
          }

          <DeleteUser
          id={user.id}
           />

      <HorizontalLine />

      <div>
      <CollapsibleCon 
      title="Bookings"
      content = {
        []
      }
      />

     <CollapsibleCon 
      title="Notifications"
      content = {
        []
      }
      />

    <CollapsibleCon 
      title="Rental History"
      content = {
        []
      }
      />
      </div>
      </div>
    </section>
  )
}

export default page
