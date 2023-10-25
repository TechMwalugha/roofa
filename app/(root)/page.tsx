import { connectToDB } from "@/lib/mongoose"

export default function Home() {
  connectToDB()

  return (
    <section className='mt-48'>
      <h1 className="text-center text-3xl font-bold">Home Page</h1>
    </section>
  )
}
