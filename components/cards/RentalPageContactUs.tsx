import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"


const RentalPageContactUs = () => {
  return (
    <div  className="w-full h-40 my-16 p-4 flex items-center justify-center flex-col">
            <img
            src="/assets/agent-working.png"
            alt="Agent"
            className="h-full object-cover"
            />
            <div className="text-center">
                <h2 className="mb-4 text-heading4-medium">Are you planning to stay for long? Or do you want the prices to be customized for your preferences?</h2>

                <Button asChild>
                    <Link href="tel:0110536267">Contact Sales Team</Link>
                </Button>
            </div>
    </div>
  )
}

export default RentalPageContactUs
