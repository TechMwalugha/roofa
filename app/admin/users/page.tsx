import SearchUser from "@/components/admin/forms/SearchUser"
import { TbSum } from "react-icons/tb";
import { MdOutlineNewLabel } from "react-icons/md";
import { MdRealEstateAgent } from "react-icons/md";
import TableCon from "@/components/admin/cards/Table";
import { usersTableHeaders } from "@/constants/index"
import { fetchAllUsers, fetchUserByEmail } from "@/lib/actions/user.actions";
import Pagination from "@/components/shared/Pagination";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getSecondsDifference } from "@/lib/utils";




const page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined
  }
}) => {

  const session = await getServerSession()


  if(!session) {
    redirect('/not-found')
  }

  const sessionUser = await fetchUserByEmail(session?.user?.email as string)

  if(!sessionUser) {
    redirect('/not-found')
  }

  let isAllowed: boolean =  sessionUser.role === 'roofa-agent' || sessionUser.role === 'admin' ? true : false

  if(!isAllowed) {
    redirect('/not-found')
  }


    const result = await fetchAllUsers({
      userId: sessionUser.id,
      searchString: searchParams?.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    })
    
    if(!result.users) {
      redirect('/admin/dashboard')
    }

    let roofaUsers = result.users.filter((user) => {
       return user.role === 'user'
      })

      
    const roofaAgents = result.users.filter((user) => {
      return user.role === 'roofa-agent'
     })

     let users = result.users
     if(sessionUser.role === 'roofa-agent') {

      users =  roofaUsers
     } 

     const newUsers = result.users.filter((user) => {
      return getSecondsDifference(user.createdAt) < 3600 * 24 * 30 && user.role !== 'roofa-agent' && user.role !== 'admin'
     })


     
    
  return (
    <div>
        <div className="flex items-center justify-between bg-success p-2">
            <div className="hidden sm:block">
              <h3 className="text-base-semibold capitalize">users september 2023</h3>
              <p className="text-dark-4 lowercase">all users</p>
            </div>
            <div className="max-sm:w-full">
                <SearchUser 
                routeType="users"
                />
            </div>
        </div>


        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <TbSum size={30} />
            <p className="text-base1-semibold capitalize">Total users</p>
            </div>

            <h3 className="text-heading3-bold mt-2">
            {`${roofaUsers[0] === undefined ? '0' : roofaUsers.length}`}
            </h3>
          </div>

          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdOutlineNewLabel size={30} />
            <p className="text-base1-semibold capitalize">new users</p>
            </div>

            <p className="text-x-small-semibold">(past 30 days)</p>
            <h3 className="text-heading3-bold mt-2">
              {newUsers.length}
            </h3>
          </div>
          { sessionUser.role === 'admin' && (
          <div className="flex flex-col flex-auto  rounded-lg shadow-count p-2">
            <div className="flex items-center gap-2">
            <MdRealEstateAgent size={30} />
            <p className="text-base1-semibold capitalize">Agents</p>
            </div>
            <h3 className="text-heading3-bold mt-2">
            {`${roofaAgents[0] === undefined ? '0' : roofaAgents.length}`}
            </h3>
          </div>
          )}
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
            <TableCon 
            title="A list of all users."
            tableHeaders = {usersTableHeaders}
            users={users}
            />
            <Pagination
            path='users'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
            />
        </div>
    </div>

  )
}

export default page
