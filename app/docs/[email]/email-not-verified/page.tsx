import { Button } from "@/components/ui/button"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getUserStatus(email: string) {
    connectToDB()
    return await User.findOne({ email: email}).select('isEmailVerified')

}

export default async function EmailNotVerified({ params } : { params: { email: string}}) {

    const email = decodeURIComponent(params.email)

    const user = await getUserStatus(email)

    if(user && user.isEmailVerified) {
        redirect('/')
    }

    return <section className="flex items-center justify-center h-screen p-2">
        <div className="shadow rounded-sm p-4 text-center">
            {
                user && (
                    <>
                     <h2 className="text-heading2-bold">401</h2>
                    <p className="text-subtle-medium text-gray-500">Opps! Your email is not verified. Please click the button below to verify your email.</p>
                    <Button asChild variant="outline">
                        <Link 
                        href={`/verify/${email}`}
                        className="mt-5"
                        >Verify</Link>
                    </Button>
                    </>
                )
            }

            {
                !user && <>
                <p className="text-subtle-medium text-gray-500">No such user</p>
                <Button asChild variant="outline">
                        <Link 
                        href={`/`}
                        className="mt-5"
                        >Home</Link>
                    </Button>
                </>
            }
        </div>
    </section>
}