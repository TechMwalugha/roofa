'use client'

import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { containsGoogleusercontent, formatDateString } from "@/lib/utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadUserImageForm =(
    {  id, image, createdAt } :
    { 
      id: string,
      image: string,
      createdAt: string,
    }) => {
        const [file, setFile] = useState<File>()
        const [error, setError] = useState('')
        const [loader, setLoader] = useState('')
     
        let displayImage = image
        
        const path = usePathname()

        //check if its google image:

        if(!containsGoogleusercontent(image as string)) {
          displayImage = `https://roofa.co.ke/images${image}`
        }


        const notifyError = (message: string) => toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "mwalError",
          theme: "dark"
        });

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
  
            if(e.target){
              const form = e.target as HTMLFormElement;
              form.reset();
            }
              

            if (!file) return
          
            if(file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5mb')
                return
            }

            const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if(!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setError('Image type must be jpeg, jpg, png or webp')
                return
            }

            try {
              const data = new FormData()
              data.set('file', file)
              data.set('id', id)
              data.set('path', path)
              data.set('image', image)

              setLoader("loading")
        
              const res = await fetch('/api/uploadUserImage', {
                method: 'POST',
                headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                },
                body: data
              })

              setLoader("")
    
              // handle the error
              if (!res.ok) {
                const { message } = await res.json()
                notifyError(message)
                return
              }

              const notifySuccess = () => toast.success("image uploaded successfully", {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "mwal",
                theme: "dark"
              });

              notifySuccess()
              
            
            } catch (e: any) {
              // Handle errors here
              console.error(e)
            }

    
          }


    return (
        <main className='mb-5 shadow p-5 rounded-lg'>
          <ToastContainer />
    <div className='flex gap-2 items-center mb-3 w-full'>
       <div className='w-16 h-16 relative'>
       <Image
       src={file === undefined ? displayImage : URL.createObjectURL(file)}
       fill
       alt="image"
       className='rounded-full object-cover'
       />

       </div>
       <h1>Update Your Image</h1>
    </div>
     <form onSubmit={onSubmit} className='flex gap-2 items-center'>
       <input 
       type="file" 
       name="file"  
       required
       accept="image/*"
       onChange={(e) => setFile(e.target.files?.[0])}
       />
       <input type="submit" value={`${loader ? "uploading..." : "Upload"}`} className='bg-transparent border p-2 rounded cursor-pointer border-blue' />
     </form>

     <p className="text-subtle-medium text-right mt-4">Joined on: {formatDateString(createdAt)}</p>
     {
        error && (
            <div className="text-center mt-5 bg-red-700 py-1">
                {error}
            </div>
        )
     }
   </main>
    )
}
export default UploadUserImageForm
