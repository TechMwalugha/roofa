import { fetchUserByEmail, fetchUserById } from "@/lib/actions/user.actions"
import { getServerSession } from "next-auth"
import {ImProfile} from 'react-icons/im'
import {MdOutlineSecurity, MdPayments} from 'react-icons/md'
import {FaGifts} from 'react-icons/fa'
import Link from "next/link"
import Warning from "@/components/shared/alerts/Warning"
import { redirect } from "next/navigation"


const page = async () => {

    const session = await getServerSession()
    
    const user = await fetchUserByEmail(session?.user?.email as string)

    if(!user) {
        redirect('/')
    }
  return (
    <div className="p-4 w-full overflow-hidden">
     <h3 className="text-small-regular sm:text-heading4-medium">
        Hello, {user.name}, 
        <span className="text-purple-300 text-regular-medium cursor-pointer hover:underline">
            {user.email}
        </span>
     </h3>
     <section className="my-10 w-full flex flex-wrap items-center gap-5">
        <Link href="account-settings/personal-info" className="p-3 shadow-lg rounded-md flex-auto w-72">
            <h4 className="mb-5">
                <ImProfile size={30}/>
            </h4>
            <p className="text-regular-medium">Personal info</p>
            <p className="text-small-medium">Provide more information and how we can reach you</p>
        </Link>

        <Link href="/forgotpassword" className="p-3 shadow-lg rounded-md flex-auto w-72">
            <h4 className="mb-5">
                <MdOutlineSecurity size={30}/>
            </h4>
            <p className="text-regular-medium">Login & Security</p>
            <p className="text-small-medium">Update your password and secure your account</p>
        </Link>

        <Link href="#" className="p-3 shadow-lg rounded-md flex-auto w-72">
            <h4 className="mb-5">
                <MdPayments size={30}/>
            </h4>
            <p className="text-regular-medium">Payments & payouts</p>
            <p className="text-small-medium">Review payments, payouts, coupons and gift cards</p>
        </Link>

        <Link href="#" className="p-3 shadow-lg rounded-md flex-auto w-72">
            <h4 className="mb-5">
                <FaGifts size={30}/>
            </h4>
            <p className="text-regular-medium">Referral credit & coupon</p>
            <p className="text-small-medium">Review payments, payouts, coupons and gift cards</p>
        </Link>
     </section>

     <Warning/>

     <div className="flex items-center justify-center flex-col">
            <p>Need to delete your account?</p>
            <Link
            href={`account-settings/delete-account/${user.id}`}
            className="text-tiny-medium underline text-blue"
            >Take care of that right now</Link>
     </div>
    </div>
  )
}

export default page
