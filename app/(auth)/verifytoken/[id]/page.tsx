
'use server'
import User from "@/lib/models/user.model"
import Image from "next/image"
import Link from "next/link"
const page = async ({ params}: { params: { id: string}}) => {
    let user
    let secondsDifference = 0 
    let execute = false

    try {
    user = await User.findOne({ verificationToken: params.id})
    // Define the target date
    if(user) {
        const targetDate = new Date(user.updatedAt);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate.getTime() - targetDate.getTime();

        // Convert milliseconds to a more readable format (e.g., seconds)
         secondsDifference = Math.floor(timeDifference / 1000);
    }

    if(user && !user.isEmailVerified && secondsDifference > 3600) {
        execute = true
        user.isEmailVerified = true
        await user.save()
    }

    } catch(error: any) {
        throw new Error('Could not verify: ' + error.message)
    }


  return (
    <div className="flex items-center justify-center h-screen p-2 w-full overflow-hidden transition-all">
        {/* verification not found */}
      {!user && (
      <div className="shadow-md p-2 flex flex-col">
        <p className="mb-3 text-subtle-semibold capitalize">verification Token not found kindly:</p>
        <Link href='/register' className="community-card_btn w-full text-center">Register</Link>
        <p className="text-center">or</p>
        <Link href='/login' className="community-card_btn w-full text-center">Login</Link>
    </div>
      )}

      {/* verification  found  but expired*/}
      {user && secondsDifference < 3600 && (
      <div className="shadow-md p-2 flex flex-col">
        <p className="mb-3 text-subtle-semibold capitalize">hello {user?.name}, verification token has expired. Kindly:</p>
        <Link href={`/verify/${user.email}`} className="community-card_btn w-full text-center">Verify Email</Link>
    </div>
      )}

      {/* if email is already verified*/}
      {user && user.isEmaiVerified && (
      <div className="shadow-md p-2 flex flex-col">
        <p className="mb-3 text-subtle-semibold capitalize">hello {user?.name}, email is already verified, kindly:</p>
        <Link href={`/login`} className="community-card_btn w-full text-center">Login</Link>
    </div>
      )}

      {execute && (
        <div className="shadow-md p-2 flex flex-col items-center justify-center">
        <Image
        src='/assets/verified.gif'
        width={72}
        height={72}
        alt='animated verify icon'
         />
         <p className="mb-3 text-subtle-semibold capitalize text-center">hello <span className="text-blue">{user?.name}</span>, <br></br> email verified successfully, login:</p>
        <Link href={`/login`} className="community-card_btn w-full text-center">Login</Link>
      </div>
      )}
</div>
  )
}

export default page
