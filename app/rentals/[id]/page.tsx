import ImageGrid from '@/components/shared/ImageGrid'
import { fetchSingleRental } from '@/lib/actions/rental.action'
import { ObjectId } from 'mongoose'
import Link from 'next/link';
import { IoShareOutline } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";
import Image from 'next/image';
import HorizontalLine from '@/components/shared/utils/HorizontalLine';
import RentalTypes from '@/components/cards/RentalTypes';
import LocationMap from '@/components/shared/LocationMap';
import Carousel from '@/components/cards/Carousel';
import BookingCard from '@/components/cards/BookingCard';

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
      id={id}
      />
     <div className='flex items-center justify-between gap-2 flex-wrap'>
      <div className=''>
        <div className='flex items-center gap-9 p-2'>
          <div>
            <h3 className='text-heading3-bold'>Entire apartment hosted by <span className='capitalize text-blue'>{rental.owner.name}</span></h3>
            <p className='capitalize'>{rental.rentalType.map((type: string, index: number) => `${index !== 0 ? ' . ' : '' } ${type}`)}</p>
          </div>
          <div className='w-16 h-16'>
            <Image
            src={rental.owner.image}
            alt="user image"
            width={30}
            height={30}
            className='w-full h-full object-cover rounded-full' 
            />
          </div>
        </div>
      <HorizontalLine />
      </div>

      <div className=''>
          <h2 className='text-heading3-bold'>Ksh. {rental.price} / <span className='italic text-base-medium text-red-500'>month</span></h2>
      </div>

      </div>

      {/* availability */}

      <div className='shadow hidden lg:block flex-auto rounded relative group h-[200px]'>
          <div
          style={{ backgroundImage: `url(/assets/advert-rental-img.jpg)` }}
          className='w-full h-full rounded-md bg-center bg-contain duration-500'
          >
          </div>
      </div>

      {/* amenities*/}
      <div 
      className='my-5'
      >
        <h2 className='text-center mb-3 text-heading4-medium'>What this place offers</h2>
        <div className=' flex flex-wrap gap-4'>
          
          {rental.amenities.map((amenity: string, index: number) => {
            return(
              <span
              key={index}
              className='bg-gray-100 px-2 py-1 rounded text-small-medium'
              >{amenity}</span>
            )
          })}
        </div>
      </div>

      <HorizontalLine />

      {/* description */}
      <p
      className='px-.5 text-small-medium my-2'
      >{rental.description}</p>

      <HorizontalLine /> 
      {/* rental types */}

      <div>
      <h2 className='text-center mb-3 text-heading4-medium'>Types of rooms </h2>

      <div 
      className='flex items-center gap-4 flex-wrap'
      >
        {rental.rentalType.map((type: string, index: number) => {
          return (
            <RentalTypes 
            key={index}
            type={type}
             />
          )
        })}
      </div>
      </div>

      <HorizontalLine />

      {/* Location on map */}

      {/* <div>
        <LocationMap />
      </div> */}
      <HorizontalLine />

      {/* rules */}

      <div>
        <h2 className=' mb-3 text-heading4-medium'>Things to know </h2>

        <div 
        className='flex gap-5 max-md:flex-col'
        >
          <div className='md:w-2/4 px-2'>
            <h3 className='text-body-medium'>House rules</h3>
          
              {rental.rentalRules.map((rule: string, index: number) => {
                return(
                  <p 
                  key={index}
                  className='text-small-regular mb-4'
                  >
                  {rule}
                  </p>
                )
              })}
          </div>

          <div className='md:w-2/4 px-2'>
            <h3 className='text-body-medium'>Booking policy</h3>
            <p className='text-small-regular mb-4'>Be aware that Roofa charges a fee for the service offered. The service fee is either paid by you or the house owners. 
            For this house the service fee is paid by {rental.serviceFee.paidBy.trim() == 'customer' ? 'you' : 'owners of the house'}. 
            <span className='bg-gray-100 p-[2px] text-primary'>{rental.serviceFee.paidBy.trim() == 'customer' ? ` The service fee is Ksh. ${rental.serviceFee.amount}` : 'No need to worry about the service Fee'}.</span> 
            </p>
            <Link
            href="/"
            className='underline decoration-solid mb-4'
            >
            More details
            </Link>
          </div>
        </div>
      </div>

      <HorizontalLine />

      {/* Houses near this house */}
      <h2 className='text-center mb-3 text-heading4-medium'>Houses near this house </h2>

      <section className='px-2 flex flex-wrap items-center gap-5 xs:flex-row mb-4'>
        {
        rental.rentalsNear && rental.rentalsNear.map((rental: any) => {
          const images = rental.images.slice(0, 5)
            return (
              <Carousel 
              key={rental.id} 
              id={rental._id.toString()}
              title={rental.title}
              location={rental.location}
              price={rental.price}
              images={images}
              />
            )
        })
      }
     </section>

     <BookingCard
     availableRooms={rental.availableRooms}
      />
    </div>
  )
}

export default page
