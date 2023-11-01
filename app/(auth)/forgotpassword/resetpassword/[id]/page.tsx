import ResetPassword from "@/components/forms/ResetPassword"
import { fetchUserByToken } from "@/lib/actions/user.actions"
import Link from "next/link"

const page = async  ({ params } : { params: { id: string }}) => {
  const user: any = await fetchUserByToken(params.id)

  if(!user) {
    return (
      <div className="flex items-center justify-center h-screen p-2 w-full overflow-hidden transition-all">
        <div className="shadow-md p-2">
            <p className="mb-3 text-subtle-semibold">verified token not found.</p>
            <Link href='/forgotpassword' className="community-card_btn w-full">Resend</Link>
        </div>
      </div>
    )
  }

  if(!user.isEmailVerified) {
    <div className="flex items-center justify-center h-screen p-2 w-full overflow-hidden transition-all">
        <div className="shadow-md p-2">
            <p className="mb-3 text-subtle-semibold">Email not verified.</p>
            <Link href={`/verify/${user.email}`} className="community-card_btn w-full">Verify</Link>
        </div>
      </div>
  }

  return (
    <div>
      <ResetPassword 
      id={user.id}
      email={user.email}
       />
    </div>
  )
}

export default page
