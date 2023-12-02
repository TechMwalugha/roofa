import ImageGrid from '@/components/shared/ImageGrid'
import { fetchSingleRental } from '@/lib/actions/rental.action'
import { ObjectId } from 'mongoose'

const page = async ({ params } : { params: { id: ObjectId}}) => {
  const id = params.id
  
  const rental = await fetchSingleRental({id})
  const rentalImages = rental.images.slice(0,5)

  return (
    <div className='md:p-2'>
      <h2 className="text-heading2-medium mb-3">{rental.title}</h2>
      <ImageGrid
      images={rentalImages}
      />
    </div>
  )
}

export default page
