import Carousel from "@/components/cards/Carousel"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"


const page = async () => {

    const session = await getServerSession()

    if(!session) redirect('/login')

    const user = await fetchUserFavourites(session.user?.email as string)

    console.log(user)
    if(!user) redirect("/login")

  return (
    <div>
        {
            user.favorites.length > 0 ? (
              <>
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
           </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-semibold text-gray-700">You have no favorites yet</h1>
                    <p className="text-gray-500">Click on the heart icon on any rental to add it to your favorites</p>

                    <Image 
                    src="/assets/sad-disappointed-emoji.gif"
                    width={30}
                    height={30}
                    alt="sad emoji"
                    className="w-2/4 h-2/4 cover"
                    />
                </div>
            )
        }
    </div>
  )
}

async function fetchUserFavourites(email: string){
  try{
    connectToDB()

    const user = await User.findOne({ email: email })
    .populate({
      path: 'favorites',
      model: "Rental",
      select: "title location price images"
    })

    return user
  } catch(err: any) {
    throw new Error(`An error occurred: ${err.message}`)
  }
}

export default page
