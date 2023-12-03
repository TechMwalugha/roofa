import ImageGrid from '@/components/shared/ImageGrid'
import { fetchSingleRental } from '@/lib/actions/rental.action'
import { ObjectId } from 'mongoose'
import Link from 'next/link';
import { IoShareOutline } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";

const page = async ({ params } : { params: { id: ObjectId}}) => {
  const id = params.id
  
  const rental = await fetchSingleRental({id})
  const rentalImages = rental.images.slice(0,5)

  return (
    <div className='md:p-2'>
      <div className=' flex items-center justify-between p-2'>
        <div>
        <h2 className="text-heading2-semibold">{rental.title}</h2>
        <p className='text-small-medium'>{rental.location}</p>
        </div>

        <div className='flex items-center gap-3'>
          <Link
          href={""} 
          className='flex items-center gap-2 hover:bg-gray-100 p-1 rounded'
          ><IoShareOutline /><span className='underline'>Share</span> </Link>

          <Link
          href={""} 
          className='flex items-center gap-2 hover:bg-gray-100 p-1 rounded'
          ><FcLikePlaceholder /> <span className='underline'>Save</span></Link>
        </div>
      </div>
      <ImageGrid
      images={rentalImages}
      />
    </div>
  )
}

export default page
