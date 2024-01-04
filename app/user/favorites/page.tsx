import Carousel from "@/components/cards/Carousel"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const page = async () => {

    const session = await getServerSession()

    if(!session) redirect('/login')

    const user = await fetchUserByEmail(session.user?.email as string)

    if(!user) redirect("/login")

   await user.populate({
        path: 'favorites',
        model: "Rental",
        select: "title location price images"
    })


  return (
    <div>
        <h3
        className="text-center text-heading3-bold mb-5"
        >Your Favorite Apartments</h3>     

        <section className='px-2 flex flex-wrap items-center gap-5 xs:flex-row mb-4'>
        {
        user.favorites && user.favorites.map((rental: any) => {
          const images = rental.images.slice(0, 5)
            return (

            <Carousel 
              key={rental.id} 
              id={rental._id.toString()}
              title={rental.title}
              location={rental.location}
              price={rental.price}
              images={images}
            />
            )
        })
      }
     </section> 
    </div>
  )
}

export default page
