import { updateUserImage } from '@/lib/actions/user.actions'
import { writeFile } from 'fs/promises'
import mongoose from 'mongoose'
import Image from 'next/image'
import { join } from 'path'

export default async function UploadUserImage(
    {  id, image } :
    { 
      id: mongoose.Schema.Types.ObjectId,
      image: string,
    }) {

  async function upload(data: FormData) {
    'use server'

    const file: File | null = data.get('file') as unknown as File
    if (!file) {
      throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const extension = file.name.split('.');

    const newFileName: string = `${Date.now()}_${id}.${extension[extension.length - 1 ]}`;

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = join('/', 'RealProjects', 'roofa', 'public', 'userImages', newFileName)
  
    await writeFile(path, buffer)

    updateUserImage({id, newFileName})

   

    return { success: true }
  }

  return (
    <main className='mb-5 shadow p-5 rounded-lg'>
     <div className='flex gap-2 items-center mb-3'>
        <div className='w-16 h-16 relative'>
        <Image
        src={image}
        fill
        alt="image"
        className='rounded-full object-cover'
        />
        </div>
        <h1>Update Your Image</h1>
     </div>
      <form action={upload} className='flex gap-2 items-center'>
        <input 
        type="file" 
        name="file"  
        required
        accept="image/*"
        />
        <input type="submit" value="Upload" className='bg-transparent border p-2 rounded cursor-pointer border-blue' />
      </form>
    </main>
  )
}