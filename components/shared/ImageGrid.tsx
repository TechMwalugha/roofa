"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import './styles.css'
import Link from 'next/link';
import { TiThSmall } from "react-icons/ti";
import { ObjectId } from 'mongoose';
import ImageComponent from './ImageComponent';

const ImageCarousel = (
  {
    images,
    id
  } : {
    images: string[]
    id: ObjectId
  }
) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className='w-full'>
    <div className="relative md:h-[320px] max-md:h-72 flex max-md:items-center gallery">
      <div 
      onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
      className="flex bg-blue p-2 z-10 absolute left-0 top-1/2 transform -translate-y-1/2 md:hidden cursor-pointer"
      >
        <button className="text-white text-2xl">&lt;</button>
      </div>
      <div 
      onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
      className="flex bg-blue p-2 z-10 absolute right-0 top-1/2 transform -translate-y-1/2 md:hidden cursor-pointer"
      >
        <button className="text-white text-2xl">&gt;</button>
      </div>
      {images.map((image, index) => (
        
       <div
       key={index}
       className={`relative bg-primary  m-0 overflow-hidden object-cover ${index === currentImage ? 'max-md:block' : 'max-md:hidden'} max-md:h-72 max-md:w-full  ${index === 0 ? 'gallery-img-1 md:rounded-s-lg' : ''} ${index === 2 || index === 4 ? "md:rounded-r-lg" : "" }`}
       >

      <ImageComponent
      src={image}
      index={index}
       />
  
       </div>

      )
      )}
      <Link
      href={`allImages?id=${id}`}
      className='absolute flex items-center gap-2 bottom-2 right-2 md:right-10 bg-slate-50 p-2 rounded shadow'
      ><TiThSmall /> <p>Show all photos</p> </Link>
    </div>

    <div className="flex items-center justify-center mt-5 md:hidden overflow-x-scroll hide-scrollbar px-5">
          {images.map((image, index) => (
            <div
            key={index}
            className={`w-24 h-24 object-cover  mx-1 cursor-pointer ${index === currentImage ? 'opacity-100 bg-primary' : 'opacity-50'}`}
            onClick={() => setCurrentImage(index)}
            >
              <ImageComponent 
              src={image}
              index={index}
              />
            </div>
            
          ))}
    </div>
    </section>
  );
};

export default ImageCarousel;
