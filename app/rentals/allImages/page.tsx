import ImageComponent from "@/components/shared/ImageComponent"
import { fetchRentalImages } from "@/lib/actions/rental.action"
import Image from "next/image"
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
    const result = await fetchRentalImages({ id: searchParams?.id })

  return (
    <div 
    className=""
    >
      {
        result && (
        <>
          <Link
      href={`/rentals/${searchParams?.id}`}
      className="bg-white inline-block m-5 rounded-full cursor-pointer sticky top-20 z-10"
      ><IoArrowBackCircleOutline size={30} /></Link>

        <h3
        className="text-center capitalize text-heading3-bold mb-5"
        >{result.title} in {result.location} images</h3>
      <div className="overflow-hidden md:flex md:flex-col md:items-center">
        { result.images.map((image: string, index: number) => {
            return (
                <div
                key={index}
                className="w-full my-3 md:w-2/4"
                >
                  <ImageComponent
                  src={image}
                  index={index + 1}
                  />
                </div>
            )
        })}
      </div>
      </>
        )
      }

      {
        !result && (
          <div
          className='flex items-center justify-center flex-col h-screen'
          >
            <Image 
            src="/assets/sad-disappointed-emoji.gif"
            width={28}
            height={28}
            alt="Error image"
            className="w-32 h-32 object-cover"
            unoptimized
            />
            <h3 className="text-heading4-medium">Opps! We did not find such a rental.</h3>
            <p className="text-subtle-medium">Please check your url or go back below</p>
            <Link
            href="/"
            className="bg-blue mt-4 px-5 py-2 rounded-sm shadow-lg hover:shadow-none"
            >
              back
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default page
