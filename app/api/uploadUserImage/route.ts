import { updateUserImage } from "@/lib/actions/user.actions";
import { writeFile, unlink, access } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";


export async function POST(request: NextRequest) {
    try {
  
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    if(file.size > 5 * 1024 * 1024) {
      throw new Error('Image should be less than 5MB')
  }

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if(!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Image type must be jpeg, jpg, png or webp')
  }
    const id = data.get('id') as any
    const pathUrl = data.get('path') as any
    const preImage = data.get('image') as any
 
  if (!file) {
    return NextResponse.json({ success: false, message: 'blank file' })
  }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

  const extension = file.name.split('.');

    const newFileName: string = `${Date.now()}_${id}.${extension[extension.length - 1 ]}`;

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = join('public', 'userImages', newFileName)
  
    await writeFile(path, buffer)

    updateUserImage({id, newFileName})
    const preImagePath: string = join('/', 'RealProjects', 'roofa', 'public', preImage)
    const isDelete = await fileExists(preImagePath)

    if(isDelete) {
      await unlink(preImagePath)
    }

   
    revalidatePath(pathUrl)
  return NextResponse.json({ success: true })
        
    } catch (error: any) {
      console.log(error.message)
        throw new Error("Error uploading image. Try again")
    }
}


async function fileExists(filePath: any) {
  try {
    await access(filePath);
    return true; // File exists
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return false; // File does not exist
    }
    return false; // Other errors
  }
}
