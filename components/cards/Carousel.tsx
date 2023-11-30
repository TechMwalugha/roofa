"use client"
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { MdEventAvailable } from "react-icons/md";
import Link from 'next/link';


function Carousel({
    id,
    title,
    location,
    price,
    images
}: {
    id: string
    title: string
    location: string
    price: number
    images: string[]
}) {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section
    className='flex-auto w-72 mb-10'>
        <div className=' h-[250px] w-full relative group'>
        <div
            style={{ backgroundImage: `url(/rentalImages/${images[currentIndex]})` }}
            className='w-full h-full rounded-md bg-center bg-cover duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
            {images.map((slide, slideIndex) => (
            <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? "text-blue" : ""} rounded-full `}
            >
                <RxDotFilled  size={20} />
            </div>
            ))}
        </div>
        </div>

        {/* apartment detalils */}

        <Link 
        href={`/${id}`}
        >
           <div className='flex gap-2 items-center mt-8 justify-between'> 
                <div>
                    <h3 className='capitalize text-heading4-medium'>{title}</h3>
                    <h4 className='text-gray-500'>{location}</h4>
                    <p className='text-gray-400'>Ksh. {price}</p>
                </div>
                <div className=' text-blue'>
                <MdEventAvailable size={30} />
                </div>
            </div>
        </Link>
    </section>
  );
}

export default Carousel;