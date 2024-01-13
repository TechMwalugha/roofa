import Image from "next/image"
import Logout from "../Logout"
import MenuBar from "../MenuBar"
import { getServerSession } from "next-auth"

const TopBar = async () => {
  const session = await getServerSession()

  if(!session) return 

  return (
    <div className="fixed top-0 flex items-center justify-between z-10 py-5 sm:px-5 inset-x-0 bg-gray-50 h-14 transition-position w-screen shadow">
      <div className="max-md:hidden">
      <Image 
            src='/assets/roofalogo.png'
            width={70}
            height={70}
            alt="Roofa logo"
            className="object-cover"
      />
      </div>
      <MenuBar 
      title={session.user?.name as string}
      image={session.user?.image as string}
      content={[
        'user/account-settings',
        'logout'
      ]}
      />
    </div>
  )
}

export default TopBar
