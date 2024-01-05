import NotificationCard from "@/components/cards/NotificationCard"
import Image from "next/image"

const page = () => {
  return (
  <div className=" md:flex md:items-center md:justify-center">
    <div className="mx-3 md:w-3/4">
      <div
      className="p-3 rounded-sm bg-blue mb-8 flex items-center justify-between"
      >
        <h3
        className="text-base1-semibold flex items-center gap-5"
        >
          Notifications

          <span
          className="bg-warning px-3 py-1 rounded-lg text-small-regular text-white"
          >0</span>
        </h3>

        <p
        className="text-gray-1 tracking-wider text-subtle-semibold hover:text-black cursor-pointer"
        >mark all as read</p>
      </div>

      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  </div>
  )
}

export default page
