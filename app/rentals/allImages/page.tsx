import Rental from "@/lib/models/rental.model"
import Link from "next/link"
import { redirect } from "next/navigation"
import { IoArrowBackCircleOutline } from "react-icons/io5"

const page = async ({
    searchParams,
  }: {
    searchParams: {
      [key: string]: string | undefined
    }
  }) => {
    if(!searchParams?.id) {
        redirect('/not-found')
    }
    const result = await Rental.findById(searchParams?.id)
    .select('images')

  return (
    <div 
    className="bg-black"
    >
      <Link
      href={`/rentals/${searchParams?.id}`}
      className="bg-white inline-block m-5 rounded-full cursor-pointer sticky top-20 z-10"
      ><IoArrowBackCircleOutline size={30} /></Link>

      <div className="overflow-hidden md:flex md:flex-col md:items-center">
        { result.images.map((image: string, index: number) => {
            return (
                <img 
                key={index}
                src={`/rentalImages/${image}`}
                alt={`rental image ${index + 1}`}
                className="w-full object-cover my-3 md:w-2/4"
                />
            )
        })}
      </div>
    </div>
  )
}

export default page
