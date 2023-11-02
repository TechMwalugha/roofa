import ForgotPassword from '@/components/forms/ForgotPassword'
import { fetchUserByEmail, updateUser } from '@/lib/actions/user.actions'
import { generateRandom32ByteString } from '@/lib/utils'
import React from 'react'

const page = async () => {
  
  return (
    <ForgotPassword/>
  )
}

export default page
