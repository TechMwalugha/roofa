import RentalCard from "@/components/admin/cards/RentalCard";
import SearchUser from "@/components/admin/forms/SearchUser";
import { fetchAllRentals } from "@/lib/actions/rental.action";
import Rental from "@/lib/models/rental.model";
import { formatDateString } from "@/lib/utils";
import Link from "next/link";
import { FaHouseChimneyMedical } from "react-icons/fa6"
import { MdOutlineNewLabel } from "react-icons/md";
import { PiHouseDuotone } from "react-icons/pi";
import { TbSum } from "react-icons/tb";

const page = async ({
  searchParams
}: {
  searchParams: {
    [key: string]: string | undefined
  }
}) => {

  // const numberOfRentals = await Rental.countDocuments()

  const rentalResults: any = await fetchAllRentals({
    searchString: searchParams?.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25
  })



    return (
      <div>
        <div className="flex items-center justify-between bg-success p-2">
            <div className="hidden sm:block">
              <h3 className="text-base-semibold capitalize">rentals {formatDateString(Date.now() as unknown as string)}</h3>
              <p className="text-dark-4 lowercase">all rentals</p>
            </div>
            <div className="max-sm:w-full">
                <SearchUser 
                routeType="rentals"
                />
            </div>
        </div>


        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <TbSum size={30} />
            <p className="text-base1-semibold capitalize">Total Rentals</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
           {rentalResults.totalRentalsCount}
            </h3>
          </div>
         
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <FaHouseChimneyMedical size={30} />
            <p className="text-base1-semibold capitalize">create rental</p>
            </div>
            <Link
            href={`/admin/rentals/create`}
             className="bg-primary mt-2 text-center rounded hover:text-white">
            create
            </Link>
          </div>
          
        </div>

        <div
        className="mt-10"
        >
            <h2
            className="text-heading4-medium"
            >All rentals</h2>

            {rentalResults.rentals.map((rental: any) => (
              <RentalCard 
              key={rental._id}
              rentalId={rental._id.toString()}
              title={rental.title}
              image={rental.images[0]}
              location={rental.location}
              price={rental.price}
              active={rental.rentalStatus}
              />
            ))}
        </div>
      </div>
    )
  }
  
  export default page