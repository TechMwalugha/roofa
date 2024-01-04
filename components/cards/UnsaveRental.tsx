'use client'
import { addFavoriteRental } from "@/lib/actions/user.actions"
import { ObjectId } from "mongoose"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri";

const UnsaveRental = ({
    id,
    rentalId
}: {
    id: ObjectId,
    rentalId: ObjectId
}) => {
    const path = usePathname()

    const [loader, setLoader] = useState<Boolean>(false)

    async function handleAddFavorite () {
        setLoader(true)
        const response = await addFavoriteRental({ id, rentalId, path})

        if(response) {
            setLoader(false)
        }
    }

  return (
    <button
            onClick={handleAddFavorite}      
            className='flex items-center gap-2 hover:bg-gray-100 p-1 rounded'
            >
            {!loader && (
                <div
                className="flex items-center gap-2 bg-primary text-subtle-semibold p-1 rounded"
                ><RiDeleteBinLine /> <span className=''>Unsave</span></div>
            )}

            {loader && (
                    <h2 className="flex gap-2 items-center bg-warning p-1 rounded">
                    <svg
                    className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg> Processing...
                    </h2>
                )
                }
    </button>
  )
}

export default UnsaveRental
