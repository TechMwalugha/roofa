import Carousel from "@/components/cards/Carousel";
import Pagination from "@/components/shared/Pagination";
import { fetchAllRentals } from "@/lib/actions/rental.action";

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
          return (
            <Carousel 
            key={rental.id} 
            id={rental._id.toString()}
            title={rental.title}
            location={rental.location}
            price={rental.price}
            images={rental.images}
             />
          )
       })
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
