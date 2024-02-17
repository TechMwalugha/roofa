"use server"

import { createPaymentInterface } from '@/interfaces';
import axios from 'axios'
import { connectToDB } from '../mongoose';
import Payment from '../models/payment.model'

export async function getAccessToken () {
  const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

  const auth = Buffer.from(process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET).toString("base64")
  try {
      const response = await axios.get(url, {
          headers: {
            authorization: `Basic ${auth}`,
          },
        });
        const accessToken = response.data.access_token;

        return accessToken
      
      
  } catch (error: any) {
      console.log(error.message)
        throw new Error(`An error occurred generating access token: ${error.message}`)
    }
}

export async function createPayment({
  MerchantRequestID,
  CheckoutRequestID,
  ResultCode,
  ResultDesc,
  amount,
  mpesaReceiptNumber,
  transactionDate,
  mpesaPhoneNumber,
  typeOfPayment,
}: createPaymentInterface) {
  try {
    connectToDB()

    const payment = new Payment({
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      amount,
      mpesaReceiptNumber,
      transactionDate,
      mpesaPhoneNumber,
      typeOfPayment,
    })

    await payment.save()
    
  } catch (error: any) {
    throw new Error(`Unable to create payment: ${error.message}`)
  }
}

export async function fetchOnePayment({ id }: {id: string}) {
  try {
    connectToDB()

    const payment: any = await Payment.findOne({ MerchantRequestID: id})

    return payment
  }catch(err: any) {
    throw new Error(`An error occurred fetching payment: ${err.message}`)
  }
}