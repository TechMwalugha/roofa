'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const UnlinkImagesForm = (props: {image: string}) => {
  const [loading, setLoading] = useState<boolean>()

    async function handleSubmit() {
        console.log('submitted')
        setLoading(true)
    }

  

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex items-center justify-between my-5"
    >
        <img
        src={`/rentalImages/${props.image}`} 
        alt="rental image"
        className="object-cover w-1/2 h-32 fill"
        loading="lazy"
        />

        <Button
        type="submit"
        >
          {!loading && (<MdDeleteOutline size={30} />)}
          {loading && (
              <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
          )}
        </Button>
    </form>
  )
}

export default UnlinkImagesForm
