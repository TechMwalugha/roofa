
import { CarouselDefault } from "@/components/cards/Carousel";
import rentals from "@/lib/testData/rentalsData";


export default function Home() {

  return (
   <section className='px-2 flex flex-wrap items-center gap-2 xs:flex-row'>
      {/* {rentals.map((rental, index) => (
        <CarouselDefault key={index} images={rental.src} name={rental.name} />   
      ))} */}
      <h1>Hello this is the home page</h1>
    </section>
  )
}
