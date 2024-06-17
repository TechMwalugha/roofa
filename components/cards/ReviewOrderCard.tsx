import { ObjectId } from "mongoose"
import Image from "next/image"
import Link from "next/link"
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import HorizontalLine from "../shared/utils/HorizontalLine";
import { formatCurrency } from "@/lib/utils";

const ReviewOrderCard = ({
    id,
    title,
    price,
    location,
    serviceFee,
    image
}: {
    id: ObjectId
    title: string
    price: number
    location: string
    serviceFee: {
        paidBy: string
        amount: number
    }
    image: string
}) => {
    let totalPrice

    if(serviceFee.paidBy.trim() == 'customer') {
        totalPrice = price + serviceFee.amount
    } else {
        totalPrice = price
    }

  return (
    <div 
    className="md:w-2/4 shadow-groups p-5 rounded w-full"
    >
        <h3 className="capitalize text-heading4-medium">Order review</h3>
        <p className="text-small-medium mb-7">step 2/3</p>
      
      {/* the order details */}

      <Link
      href={`/rentals/${id}`}
      className="flex items-center justify-between mb-7"
      >
        <div
        className="flex items-center gap-4"
        >
        <div>
            <img
            src={`/images/rentalImages/${image}`} 
            width={40}
            height={40}
            alt={`${title} image`}
            className="w-24 h-20 object-cover rounded-lg"
            />
        </div>

        <div
        className="self-start"
        >
            <h4
            className="text-base1-semibold"
            >{title}</h4>
            <p
            className="text-small-semibold"
            >{location}</p>
        </div>
        </div>

        <div
        className="flex items-center gap-3"
        >
            <span>
            <CiCircleMinus  size={30} />
            </span>

            <p>
                1
            </p>
            <CiCirclePlus size={30} />
            <span>

            </span>
        </div>
      </Link>

      <HorizontalLine />

      <div>
        <h2
        className="uppercase text-base1-semibold mb-5"
        >price details</h2>

        <div>
            <div
            className="flex items-center justify-between mb-3"
            >
                <p
                className="text-small-medium text-gray-1"
                >Rent</p>
                <p
                className="text-small-medium text-gray-1"
                >{formatCurrency(price)}</p>
            </div>

            {
                serviceFee.paidBy.trim() == 'customer' && (
                    <div
                   className="flex items-center justify-between mb-3"
                   >
                        <p
                        className="text-small-medium text-gray-1"
                        >Service fee</p>
                        <p
                        className="text-small-medium text-gray-1"
                        >{formatCurrency(serviceFee.amount)}</p>
                    </div>
                )
            }

            <div
            className="flex items-center justify-between mb-4"
            >
                <p
                className="text-small-medium text-gray-1"
                >Discount</p>
                <p
                className="text-small-medium text-gray-1"
                >{formatCurrency(0)}</p>
            </div>

            <div
            className="flex items-center justify-between mb-4"
            >
                <p
                className="text-small-semibold"
                >Total Price</p>
                <p
                className="text-small-semibold"
                >{formatCurrency(totalPrice)}</p>
            </div>
        </div>
      </div>

      <HorizontalLine />

      <p className="text-tiny-medium italic text-center">
        After you fill out your details click book and an M-pesa transaction will be initiated, enter your M-pesa pin and wait for the order to be completed.
    </p>
    </div>
  )
}

export default ReviewOrderCard
