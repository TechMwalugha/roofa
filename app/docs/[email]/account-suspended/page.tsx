
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import Image from "next/image"
import { redirect } from "next/navigation"

async function getUserStatus(email: string) {
    connectToDB()
    return await User.findOne({ email: email}).select('accountStatus')

}

export default async function AccountSuspended({ params } : { params : { email: string}}) {
    const email = decodeURIComponent(params.email)

    const user = await getUserStatus(email)

    if(!user) redirect('/')

    if(user && user.accountStatus) redirect('/')

    return <section className="flex items-center justify-center h-screen p-2">
        <div className="shadow p-5 text-center">
        <h2 className="text-heading2-bold">401</h2>
        <div className="flex items-center justify-center my-4">
        <Image
               src="/assets/login_notification_image.png" 
               height={100}
               width={100}
               alt="Notification icon"
               className="mb-3"
               />
        </div>
        <p className="text-subtle-medium text-red-500 font-bold">Opps! Your account is suspended. please  <a href="mailto:accounts@roofa.co.ke" className="text-blue">email us</a> if you think this is a mistake or to get more info
        </p>
        </div>
    </section>
}