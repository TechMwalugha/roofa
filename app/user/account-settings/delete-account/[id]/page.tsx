import DeleteAccountForm from "@/components/forms/DeleteAccountForm"
import { fetchUserById } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"


const page = async ({ params }: { params: { id: string }}) => {

    const session = await getServerSession()


    const user = await fetchUserById(params.id as any)

    if(!user) {
      redirect('/')
  }

    if(session?.user?.email !== user.email) {
        redirect('/')
    }

  return (
    <div>
      <section className="flex items-center justify-center h-screen">
        <DeleteAccountForm id={params.id} />
      </section>
    </div>
  )
}

export default page
