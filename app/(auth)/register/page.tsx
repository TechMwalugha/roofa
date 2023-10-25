import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()

  session ? redirect('/') : (
    <div className="text-dark-1">
      Register
    </div>
  )
}

export default page