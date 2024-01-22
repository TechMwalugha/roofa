'use client'

import { useState } from "react"
import CustomFileSelector from "./CustomFileSelector"
import ImagePreview from "../cards/ImagePreview"
import { updateRentalImagesAction } from "@/lib/actions/rental.action"
import { ObjectId } from "mongoose"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { GrUpdate } from "react-icons/gr";


const UpdateRentalImages = ({ rentalId ,images, title, location }: { rentalId: string ,images: string[], title: string, location: string}) => {

    const [newImages, setNewImages] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const notifySuccess = () => {
        toast.success('Images updated successfully.', {
            position: 'top-right',
            toastId: 'imagesUpdateRental'
        })
    }

    function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            const _files = Array.from(e.target.files)
            setNewImages(_files)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
  
        if(newImages.length < 1) {
            alert('No changes detected')
            return
        }


        setLoading(true)
        const formData = new FormData(e.currentTarget)

        newImages.forEach((image, i) => {
            formData.append(image.name, image)
        })

        const res = await fetch('/api/uploadRentalImages', {
            method: 'POST',
            body: formData
        })

        const responseData = await res.json()

        await updateRentalImagesAction({
            rentalId: rentalId as unknown as ObjectId,
            images: responseData.data
        })

        setNewImages([])

        setLoading(false)

        notifySuccess()
        
        router.refresh()
    }

  return (
    <div
    className="shadow-md rounded-sm p-2"
    >
        <ToastContainer />
        <h4 className="text-small-regular mb-4 text-center capitalize">Add new Images to {title} in {location}</h4>
        <div className="">
       <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
       <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={handleFileSelected}
          />
        </div>
        <ImagePreview images={newImages} />

        <button
        type="submit"
        className="w-full rounded-lg p-3 bg-blue flex items-center justify-center text-white"
        >
            {!loading && (<GrUpdate />)}
            {loading && (
              <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
        </button>
       </form>

      </div>
    </div>
  )
}

export default UpdateRentalImages
