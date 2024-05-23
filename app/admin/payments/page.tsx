import SearchUser from "@/components/admin/forms/SearchUser";
import PaymentCard from "@/components/cards/PaymentCard";
import Pagination from "@/components/shared/Pagination";
import HorizontalLine from "@/components/shared/utils/HorizontalLine";
import { fetchAllPayments } from "@/lib/actions/payment.action";
import { checkWhetherIsAgentOrAdmin, getSecondsDifference } from "@/lib/utils";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";

const page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined
  }
}) => {

  const results: any = await fetchAllPayments({
      searchString: searchParams?.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 20,
  })

  const paymentsThisMonth = results.payments.filter((payment: any) => {
    return getSecondsDifference(payment.createdAt) < 3600 * 24 * 30
  })

  const totalEntirePayments = results.payments.reduce((acc: number, payment: any) => {
    return acc + payment.amount
  }, 0)

  const totalPaymentsThisMonth = paymentsThisMonth.reduce((acc: number, payment: any) => {
    return acc + payment.amount
  }, 0)
    return (
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="shadow p-2 rounded-sm flex-1 hover:shadow-count transition-all delay-2000 cursor-pointer">
            <p className="bg-warning rounded-full inline-block text-blue text-center p-2">
            <GiReceiveMoney size={34} />
            </p>
            <h3 className="text-base1-semibold">Total amount received <span className="text-subtle-medium text-warning">(entire)</span></h3>
            <h5 className="text-center mt-3 text-heading3-bold">Ksh. {totalEntirePayments}</h5>
          </div>
          <div className="shadow p-2 rounded-sm flex-1 hover:shadow-count transition-all delay-2000 cursor-pointer">
            <p className="bg-warning rounded-full inline-block text-blue text-center p-2">
            <GiTakeMyMoney size={34} />
            </p>
            <h3 className="text-base1-semibold">Total amount received <span className="text-subtle-medium text-warning">(this month)</span></h3>
            <h5 className="text-center mt-3 text-heading3-bold">Ksh. {totalPaymentsThisMonth}</h5>
          </div>
        </div>

        <div className="mt-5">
          <div className="max-sm:w-full">
                  <SearchUser 
                  routeType="payments"
                  />
          </div>

          <HorizontalLine />

          <div>
            <h3 className="text-base-semibold capitalize text-center">Payments</h3>
            <p className="text-dark-4 lowercase text-center text-subtle-medium mb-3">all payments</p>

            <div>
              {results.payments.map((payment: any, index: Number) => {
                return (
                  <div key={payment._id} className="mb-3">
                    <PaymentCard 
                    type={payment.typeOfPayment}
                    mpesaReceiptNumber={payment.mpesaReceiptNumber}
                    amount={payment.amount}
                    paymentMadeOn = {payment.createdAt}
                    mpesaPhoneNumber={payment.mpesaPhoneNumber}
                    />
                  </div>
                )
              })}

            <Pagination
            path='payments'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={results.isNext}
            />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default page