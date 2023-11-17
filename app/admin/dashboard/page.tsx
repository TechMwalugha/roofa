import TableCon from "@/components/admin/cards/Table"
import { formatDateString } from "@/lib/utils"


const page = () => {
  const dateNow: any = Date.now()
  return (
    <div className="p-4 md:pl-80 mt-20">
        <h1 className="text-2xl font-bold text-heading2-semibold">Dashboard</h1>
        <p className="p-2 inline-block bg-teal-200">{formatDateString(dateNow)}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex-auto w-56 h-52 rounded-lg shadow-xl">

          </div>
          <div className="flex-auto w-56 h-52 rounded-lg shadow-xl">

          </div>
          <div className="flex-auto w-56 h-52 rounded-lg shadow-xl">

          </div>
        </div>
        <hr className="my-5" />

        <h1 className="text-2xl font-bold text-body-bold">Recent Bookings</h1>
        <section className="shadow-lg  mt-2">
          <TableCon/>
        </section>
    </div>
  )
}

export default page
