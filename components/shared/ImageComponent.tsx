'use client'

import { useEffect, useState } from "react"

 
interface ImagesInterface {
    src: string
    index: number
}

const ImageComponent = ({
    src, 
    index
}: ImagesInterface) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = `https://roofa.co.ke/images/rentalImages/${src}`
        img.onload = () => setImageLoaded(true)
    }, [src])

  return (
    <>
      {
        !imageLoaded && (<div
            className='w-full h-full animate-pulse bg-slate-300'
          />)
      }
      
      
     { imageLoaded && (<img
          src={`https://roofa.co.ke/images/rentalImages/${src}`}
          alt={`Image ${index + 1}`}
          className={`w-full h-full object-cover`}
          loading="lazy"
        />)
     }
    </>
  )
}

export default ImageComponent
