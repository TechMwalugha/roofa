import { fetchUserByEmail, updateUser } from "@/lib/actions/user.actions";
import { accountsEmail } from "@/lib/emailing/mailing.email";
import { generateRandom32ByteString } from "@/lib/utils";
import { getServerSession } from "next-auth"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation"

const Page = async  ({ params }: {params: {email: string}}) =>{
  const session = await getServerSession()
  const decodedEmail = decodeURIComponent(params.email);

  if(session) {
    redirect('/')
  }

  const user = await fetchUserByEmail(decodedEmail)


    if(user) {

      if(user.isEmailVerified) {
        redirect('/')
      }

      const randomString = generateRandom32ByteString()

      await updateUser({
        email: user.email,
        type: 'verificationToken',
        content: randomString,
    })

    accountsEmail({
      email: user.email,
      subject: 'VERIFICATION',
      heading: 'Verify Email',
      content: `Click the link to verify email: 
      <a style="font-size: 22px;" href=https://roofa.co.ke/verifytoken/${randomString}>Click here</a> 
      <br/> 
      <br/> 
      The token expires in 1 hour.
      <br/>
      <br/>
      Or paste this url in your browser: https://roofa.co.ke/verifytoken/${randomString}
      <br />
      <br />
      If you did not request this, please ignore this email.
      `
    })
}
  

  return (
    <div 
    className="flex items-center justify-center h-screen p-2 w-full overflow-hidden transition-all"
    >
      {/* if user does not exist */}
      {!user && (
      <div className="shadow-md p-2">
      <p className="mb-3 text-subtle-semibold">Account does not exist.</p>
      <Link href='/register' className="community-card_btn w-full">Register</Link>
    </div>
      )}

      {/* if user is already verified */}
      {user && user?.isEmailVerified && (
        <div className="shadow-md p-2">
          <p className="mb-3 text-subtle-semibold">email already verified.</p>
          <Link href='/login' className="community-card_btn w-full">Login</Link>
        </div>
      )}
      {user && !user?.isEmailVerified && (
        <div className="shadow p-2 rounded flex flex-col w-3/4 lg:w-1/2">
          <h3 className="text-center capitalize">check your email and click the link to activate account</h3>
        <Image
        src='/assets/verifyemail.jpg'
        width={100}
        height={100}
        alt="verify email image"
        className="object-cover mx-auto"
        />

        <div>
          <p className="text-small-medium">
            If you did not receive an email, please check your spam folder or 
          </p>
          <div className="flex items-center justify-between mt-3">
            <Link href="#" className="text-small-medium bg-blue p-1 rounded capitalize hover:bg-black hover:text-white">Resend Link</Link>
            <Link href="/register" className="text-small-medium bg-blue p-1 rounded capitalize hover:bg-black hover:text-white">create Account</Link>
            <Link href="#" className="text-small-medium bg-blue p-1 rounded capitalize hover:bg-black hover:text-white">Help</Link>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Page
