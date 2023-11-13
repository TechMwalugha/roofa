
import LoginForm from "@/components/forms/LoginForm";
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()

  if (session) {
    redirect('/')
  }

  return  (
    <LoginForm />
  )
}

export default page
