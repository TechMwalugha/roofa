import PaymentCard from "@/components/cards/PaymentCard"
import Warning from "@/components/shared/alerts/Warning"
import { fetchUserPayments } from "@/lib/actions/user.actions"
import { formatDateString } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {

    const sessionUser = await getServerSession()

    //user not login in
    if (!sessionUser) redirect('/login')
    
    const user: any = await fetchUserPayments({email: sessionUser.user?.email as string})

  return (
    <div className="lg:px-28 p-4">
        {
            user && user?.payments?.length > 0 && (
        <section className="p-2">
            <div>
                <h2 className="text-heading3-bold text-center">Payments</h2>

                <p className="text-small-regular">Dear, <span className="text-green-500 capitalize"> {user.name} </span>
                this are your payments. If you have made a payment and it is not listed here please contact us.
                </p>

                <div className="mt-5">
                    <Warning 
                    subject="This is a payment warning"
                    content="Note that payments will be added here, only if you make the payments while your login in. If you make a payment while not login in, it will not be added here."
                    viewMoreUrl="/contact-us"
                    />
                </div>
            </div>

            <div>
                <h2 
                className="text-center text-body-bold mb-6"
                >You have {user.payments.length} payments made so far</h2>

                {
                    user && user.payments && user.payments.map((payment: any, index: number) => (
                        <div key={index}>
                            <PaymentCard 
                            type={payment.typeOfPayment}
                            mpesaReceiptNumber = {payment.mpesaReceiptNumber}
                            amount = {payment.amount}
                            paymentMadeOn = {payment.createdAt as unknown as string}
                            mpesaPhoneNumber = {payment.mpesaPhoneNumber}
                            />
                        </div>
                    ))
                }
            </div>
        </section>
            )
        }

        {
            !user && (<div className="flex flex-wrap items-center justify-center flex-col py-10">
            <h4 className="text-heading3-bold">No payments found</h4>
            <p className="text-subtle-medium">
                Make a booking today ! 
                <a href="/" className="text-blue">Book</a>
            </p>
        </div>)
        }
      
    </div>
  )
}

export default page
