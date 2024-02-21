"use server"

import { createPaymentInterface } from '@/interfaces';
import axios from 'axios'
import { connectToDB } from '../mongoose';
import Payment from '../models/payment.model'
import { FilterQuery, SortOrder } from 'mongoose';

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

export async function fetchAllPayments({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof Payment> = {

    };

    // If the search string is not empty, add the $or operator to match either name or email fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { typeOfPayment: { $regex: regex } },
        { mpesaReceiptNumber: { $regex: regex } },
        { mpesaPhoneNumber: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const paymentsQuery = Payment.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    // Count the total number of users that match the search criteria (without pagination).
    const totalPaymentsCount = await Payment.countDocuments(query);

    const payments = await paymentsQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalPaymentsCount > skipAmount + payments.length;

    return { payments, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}