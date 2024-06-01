import Carousel from "@/components/cards/Carousel";
import Pagination from "@/components/shared/Pagination";
import { fetchAllRentals } from "@/lib/actions/rental.action";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined
  }
}) {

  const result = await fetchAllRentals({
    searchString: searchParams?.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  })

  return (
    <>
   <section className='px-2 flex flex-wrap items-center gap-5 xs:flex-row'>
      {
        result.rentals && result.rentals.map((rental) => {
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
     {
       result.rentals && result.rentals.length === 0 && (
         <div className='w-full text-center text-2xl text-gray-400 mb-10 mx-auto'>
            No rentals found
            <img src="/assets/sad-disappointed-emoji.gif" alt="" className="mx-auto" />
          </div>
        )
      }
    </section>
    <Pagination
            path='/'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
            />
    </>
  )
}
