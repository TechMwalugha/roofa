import SearchUser from "@/components/admin/forms/SearchUser";
import Link from "next/link";
import { FaHouseChimneyMedical } from "react-icons/fa6"
import { MdOutlineNewLabel } from "react-icons/md";
import { PiHouseDuotone } from "react-icons/pi";
import { TbSum } from "react-icons/tb";

const page = () => {
    return (
      <div>
        <div className="flex items-center justify-between bg-success p-2">
            <div className="hidden sm:block">
              <h3 className="text-base-semibold capitalize">users september 2023</h3>
              <p className="text-dark-4 lowercase">all users</p>
            </div>
            <div className="max-sm:w-full">
                {/* <SearchUser 
                routeType="users"
                /> */}
            </div>
        </div>


        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <TbSum size={30} />
            <p className="text-base1-semibold capitalize">Total Rentals</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
           121
            </h3>
          </div>

          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <PiHouseDuotone size={30} />
            <p className="text-base1-semibold capitalize">new users</p>
            </div>

            <p className="text-x-small-semibold">(this month)</p>
            <h3 className="text-heading3-bold mt-2">
              12
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
      </div>
    )
  }
  
  export default page