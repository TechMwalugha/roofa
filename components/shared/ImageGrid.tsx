"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import './styles.css'


const ImageCarousel = (
  {
    images
  } : {
    images: string[]
  }
) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className='w-full'>
    <div className="max-md:relative md:h-[320px] max-md:h-72 flex max-md:items-center gallery">
      <div className="flex bg-blue p-2 z-10 absolute left-0 top-1/2 transform -translate-y-1/2 md:hidden">
        <button onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)} className="text-white text-2xl">&lt;</button>
      </div>
      <div className="flex bg-blue p-2 z-10 absolute right-0 top-1/2 transform -translate-y-1/2 md:hidden">
        <button onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)} className="text-white text-2xl">&gt;</button>
      </div>
      {images.map((image, index) => (
        
       <div
       key={index}
       className={`relative bg-primary  m-0 overflow-hidden object-cover ${index === currentImage ? 'max-md:block' : 'max-md:hidden'} max-md:h-72 max-md:w-full  ${index === 0 ? 'gallery-img-1 md:rounded-s-lg' : ''} ${index === 2 || index === 4 ? "md:rounded-r-lg" : "" }`}
       >
         <img
          src={`/rentalImages/${image}`}
          alt={`Image ${index + 1}`}
          className={`w-full h-full object-cover`}
        />
       </div>

      ))}
      {/* <img src="/rentalImages/1701332993436_mercury.jpg" alt="image" className='gallery-img-1' />
      <img src="/rentalImages/1701332993436_mercury.jpg" alt="image" />
      <img src="/rentalImages/1701332993436_mercury.jpg" alt="image" />
      <img src="/rentalImages/1701332993436_mercury.jpg" alt="image" />
      <img src="/rentalImages/1701332993436_mercury.jpg" alt="image" /> */}

    </div>

    <div className="flex mt-5 items-center justify-center md:hidden">
          {images.map((image, index) => (
            <Image
              key={index}
              src={`/rentalImages/${image}`}
              width={72}
              height={72}
              alt={`Rental image ${index}`}
              className={`w-24 h-24 object-cover  m-1 cursor-pointer ${index === currentImage ? 'opacity-100 bg-primary' : 'opacity-50'}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
    </section>
  );
};

export default ImageCarousel;
