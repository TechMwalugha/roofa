import TableCon from "@/components/admin/cards/Table"
import { checkWhetherIsAgentOrAdmin, formatDateString } from "@/lib/utils"
import { MdPendingActions } from "react-icons/md";


const page = () => {


  const dateNow: any = Date.now()
  return (
    <div className="">
        <h1 className="text-2xl font-bold text-heading2-semibold">Dashboard</h1>
        <p className="p-2 mb-2 inline-block bg-teal-200">{formatDateString(dateNow)}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdPendingActions size={30} />
            <p className="text-base1-semibold capitalize">new bookings</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              121
            </h3>
          </div>
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdPendingActions size={30} />
            <p className="text-base1-semibold capitalize">new bookings</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              121
            </h3>
          </div>
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdPendingActions size={30} />
            <p className="text-base1-semibold capitalize">new bookings</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
              121
            </h3>
          </div>
        </div>
        <hr className="my-5" />

        <h1 className="text-2xl font-bold text-body-bold">Recent Bookings</h1>
        <section className="shadow-lg  mt-2">
          {/* <TableCon
          
          /> */}
        </section>
    </div>
  )
}

export default page
