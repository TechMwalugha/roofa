'use client'

import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "../ui/button";

const GenerateReceipt = ({ merchantRequestId } : { merchantRequestId : string }) => {


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const notifyError = (message: string) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: "mwal",
    theme: "dark"
  });

  const notifySuccess = (message: string) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: "mwalsuccess",
    theme: "dark"
  });

  useEffect(() => {
    
    if(loading) {
     const timer = setTimeout(() => {
        notifyError('The request is taking longer than usual.')

      }, 10000)

      return () => {
        clearTimeout(timer)
      }
    }

  }, [loading])

  async function handleButtonClick() {
    setLoading(true)
    notifySuccess("Request initiated, the estimated wait time is 10 seconds ")
    const response = await fetch('/api/payments/regenerateReceipt', {
      method: 'POST',
  
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ merchantRequestId }),
    })

    const data = await response.json()
    if(response.status === 200 && data.message == 'Receipt not regenerated. Try again') {
      notifyError(data.message)
    }

    if(response.status === 200 && data.message == 'Receipt sent successfully. Kindly check your email') {
      notifySuccess(data.message)
    }
    setLoading(false)
  }
  return (
    <div 
    className='mt-10'
    >
      <ToastContainer />
        <h3 className='text-body-bold text-center'>Booking successfully</h3>
        <p className='text-center text-subtle-medium'>Your booking was successfully made. Please check your email for more information</p>
        <p className='text-center text-subtle-medium'>If you have not received the email, please check your spam folder. Or click the button below to resend the email.</p>

        <div className='flex justify-center mt-5'>
          
          <Button 
          className='bg-green-500 text-white px-3 py-1 rounded-sm'
          type="submit"
          disabled = {loading}
          onClick={() => handleButtonClick()}
          >{!loading && 'Generate Receipt'}
          {loading && (<><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  </svg>
  Generating...</>)}</Button>
  
        </div>
    </div>
  )
}

export default GenerateReceipt
