import Danger from '@/components/shared/alerts/Danger'
import HorizontalLine from '@/components/shared/utils/HorizontalLine'
import { fetchOneBooking } from '@/lib/actions/booking.action'
import { formatDateString } from '@/lib/utils'
import React from 'react'



const page = async ({ params }: { params : { id: string}}) => {

  const booking = await fetchOneBooking(params.id)

  return (
    <div 
    className='p-3 rounded m-3 shadow-count'
    >
    { booking && (
      <>
      <h3 className='text-center text-heading3-medium'>Details of the booking</h3>
      <HorizontalLine />

      <div 
      className='lg:flex lg:gap-5 justify-between'
      >
        <div className='bg-gray-100 rounded-md p-2 flex justify-center flex-col flex-auto'>
          {booking.bookedBy && (
            <div className='w-24 h-24 rounded-full cursor-pointer mx-auto mt-4'>
              <img 
              src={`${booking.bookedBy.image}`} 
              alt="user image"
              className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}

          <div className='mt-10'>
            <div className='flex items-center justify-between text-subtle-medium bg-danger p-2 mb-2'>
              <h5 className=''>Name: </h5>
              <p className='text-green-300 capitalize'>{booking.fullName}</p>
            </div>

            <div className='flex items-center justify-between text-subtle-medium bg-blue p-2 mb-2'>
              <h5 className=''>Email: </h5>
              <p className='text-green-300'>{booking.email}</p>
            </div>

            <div className='flex items-center justify-between text-subtle-medium bg-danger p-2 mb-2'>
              <h5 className=''>Identity Number: </h5>
              <p className='text-green-300'>{booking.identityNumber}</p>
            </div>

            <div className='flex items-center justify-between text-subtle-medium bg-blue p-2 mb-2'>
              <h5 className=''>Gender: </h5>
              <p className='text-green-300'>{booking.gender}</p>
            </div>

            <div className='flex items-center justify-between text-subtle-medium bg-danger p-2 mb-2'>
              <h5 className=''>Reporting Date: </h5>
              <p className='text-green-300'>{formatDateString(booking.reportingDate as string)}</p>
            </div>
          </div>
        </div>

       <div className='flex-auto flex flex-col gap-4 max-lg:mt-5'>
       <div className='bg-gray-100 rounded-md w-full p-2 flex justify-center flex-col flex-auto'>
          <h4 className='text-base1-semibold text-center'>Rental booked</h4>

          <div className='flex items-center justify-between'>
            <div>
              <img 
              src={`/rentalImages/${booking.apartmentBooked.images[0]}`} 
              className="w-28 h-24 object-cover rounded-sm mb-2"
              alt="rental image"
              />
            <p>Ksh. {booking.apartmentBooked.price}</p>
            </div>

            <div className="self-start">
            <h5>{booking.apartmentBooked.title}</h5>
            <p className="text-small-medium">{booking.apartmentBooked.location}</p>

            {booking.apartmentBooked.rentalType.map((type: string, index: number) => {
            return (<p key={index} className='text-subtle-medium lowercase'>{type}</p>)
            })}
            </div>
          </div>
        </div>

        <div className='bg-gray-100 rounded-md w-full p-2 flex justify-center flex-col'>
          <div className='flex items-center  flex-col'>
            <img 
            src={`${booking.isPaymentMade.isMade ? '/assets/verified-image.png' : '/assets/reject-button.svg'}`} alt="icon"
            className="w-20 h-20 object-cover"
            />

            <p className="">
            {`${booking.isPaymentMade.isMade ? 'Your payment is confirmed. Please generate receipt' : 'Payment not confirmed.'}`}
            </p>

            <span 
            className="text-subtle-medium"
            >{booking.isPaymentMade.reason}</span>
          </div>
        </div>
       </div>
      </div>
    </>
    )}

    {/* if the booking has been settled already */}

    {
      booking && booking.isPaymentMade.isMade && booking.isBookingSettled && (
        <div 
        className='mt-10'
        >
          <Danger
          text="This booking has already been settled. Contact us for more information"
          />
        </div>
      )
    }

    <div 
    className='mt-10'
    >
      <h3 className='text-body-bold text-center'>Booking successfully</h3>
      <p className='text-center text-subtle-medium'>Your booking was successfully made. Please check your email for more information</p>
      <p className='text-center text-subtle-medium'>If you have not received the email, please check your spam folder. Or click the button below to resend the email.</p>

      <div className='flex justify-center mt-5'>
        <button 
        className='bg-green-500 text-white px-3 py-1 rounded-sm'
        >Generate receipt</button>
      </div>
    </div>

      {/* no booking found */}
      {
       !booking && (
         <div className='w-full text-center text-2xl text-gray-400 mb-10 mx-auto'>
            No such booking found.
            <img src="/assets/sad-disappointed-emoji.gif" alt="" className="mx-auto" />
          </div>
        )
      }
      </div>
  )
}

export default page
