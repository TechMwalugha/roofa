import Image from "next/image"
import classNames from 'classNames'
import { TfiMoreAlt } from "react-icons/tfi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Link from "next/link";

const RentalCard = ({
    rentalId,
    image,
    title,
    location,
    price,
    active
}: {
    rentalId: string
    image: string,
    title: string,
    location: string
    price: number
    active: boolean
}) => {
  return (
    <div
    className="flex item-center gap-5 mt-5 shadow-sm"
    >
        <div>
            <Image
            src={`/rentalImages/${image}`}
            width={30}
            height={30}
            alt={`rental image`}
            className="object-cover w-20 h-20 rounded"
             />
        </div>

        <div>
            <h3
            className="text-heading4-medium"
            >{title}</h3>
            <p
            className="text-base1-semibold"
            >{location}</p>
            <span
            className="text-subtle-medium"
            >
                Ksh. {price}
            </span>
        </div>

        <div>
            <button
            className={classNames({
                "bg-success": active,
                "bg-error": !active,
                "p-2 rounded-md": true,
            })}
            >
                {active ? 'active' : 'suspended' }
            </button>
        </div>

        <Link 
        href={`rentals/rental/${rentalId}`}
        className="ml-auto hover:bg-blue p-1 rounded-full  w-10 h-10 flex items-center justify-center"
        >
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><TfiMoreAlt /></TooltipTrigger>
                <TooltipContent>
                <p>more...</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </Link>

    </div>
  )
}

export default RentalCard
