import SearchUser from "@/components/admin/forms/SearchUser"
import { TbSum } from "react-icons/tb";
import { MdOutlineNewLabel } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import Link from "next/link";
import TableCon from "@/components/admin/cards/Table";



const page = () => {
  return (
    <div>
        <div className="flex items-center justify-between bg-success p-2">
            <div className="hidden sm:block">
              <h3 className="text-base-semibold capitalize">users september 2023</h3>
              <p className="text-dark-4 lowercase">all users</p>
            </div>
            <div className="max-sm:w-full">
                <SearchUser />
            </div>
        </div>


        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <TbSum size={30} />
            <p className="text-base1-semibold capitalize">Total users</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              121
            </h3>
          </div>

          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdOutlineNewLabel size={30} />
            <p className="text-base1-semibold capitalize">new users</p>
            </div>

            <p className="text-x-small-semibold">(this month)</p>
            <h3 className="text-heading3-bold mt-2">
              121
            </h3>
          </div>
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <FiUserPlus size={30} />
            <p className="text-base1-semibold capitalize">new agent</p>
            </div>

            <Link
            href="/new-agent"
            className="text-center mt-2 hover:text-white bg-primary p-2 rounded-md"
            >
                create
            </Link>
          </div>
        </div>

{/*---horizontal line----*/}
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                </svg>
            </div>
        </div>

        <div>
            <TableCon />
        </div>
    </div>

  )
}

export default page
