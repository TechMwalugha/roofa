import Link from "next/link"


const page = ({
    searchParams,
  }: {
    searchParams: {
      [key: string]: string | undefined
    }
  })=> {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-bounce bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">{searchParams.error}</p>
        <p>Email might be using Credentials signIn.</p>

        <Link href="/login"
        className="bg-transparent hover:bg-blue text-blue font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded mt-5"
        >Login</Link>
        </div>
    </div>
  )
}

export default page
