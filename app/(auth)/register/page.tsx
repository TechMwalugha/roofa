import RegisterForm from "@/components/forms/RegisterForm"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()

  if (session) {
    return redirect('/')
  }
  return (
    <RegisterForm />
  )
}

export default page