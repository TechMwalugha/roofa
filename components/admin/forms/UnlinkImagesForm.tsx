'use client'

import { Button } from "@/components/ui/button"
import { deleteRentalImages } from "@/lib/actions/rental.action";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnlinkImagesForm =  (props: {image: string; rentalId: string}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function notify() {
    toast.success('image deleted', {
      position: 'bottom-right'
    })
  }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const confirmWithUser = confirm('Are you sure you want to delete this image?')
        if(!confirmWithUser) return
        setLoading(true)

        await deleteRentalImages({ 
          image: props.image, 
          rentalId: props.rentalId as unknown as ObjectId
        })
        setLoading(false)
        notify()
        router.refresh()
    }

  

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex items-center justify-between my-5"
    >
      <ToastContainer />
        <img
        src={`/images/rentalImages/${props.image}`} 
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
