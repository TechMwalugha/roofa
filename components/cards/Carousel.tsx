'use client'
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  images: string[],
  name: string
}
 
export function CarouselDefault({images, name}: Props) {
  return (
    <Link href='/' className="flex rounded-sm flex-col flex-auto w-72 ">
      <Carousel className="rounded-xl w-full   h-60">
        {images.map((image) => (
          <Image 
          src={image}
          alt={name}
          fill
          className="object-cover"
          />
        ))}
      </Carousel>
      <div>
        Hello
      </div>
    </Link>
  );
}