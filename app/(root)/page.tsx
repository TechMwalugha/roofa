
import { CarouselDefault } from "@/components/cards/Carousel";
import rentals from "@/lib/testData/rentalsData";
import Link from "next/link";


export default function Home() {

  return (
   <section className='mt-48 px-2 flex flex-wrap items-center gap-2 xs:flex-row'>
      {rentals.map((rental, index) => (
        <CarouselDefault key={index} images={rental.src} name={rental.name} />   
      ))}
    </section>
  )
}
