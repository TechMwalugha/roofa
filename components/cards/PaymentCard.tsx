import { formatDateString } from "@/lib/utils"
import { GiConfirmed } from "react-icons/gi";
interface PaymentInterface {
    type: string
    mpesaReceiptNumber: string
    amount: number
    paymentMadeOn: string
    mpesaPhoneNumber: string
    
}
const PaymentCard = ({ type , mpesaReceiptNumber, amount, paymentMadeOn, mpesaPhoneNumber}: PaymentInterface) => {
  return (
    <div className="shadow p-2 mb-2 rounded cursor-pointer hover:shadow-count transition-all delay-2000">
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-body-bold mb-1">{type}</h4>
                <p className="text-gray-400 text-subtle-medium">{mpesaReceiptNumber}</p>
            </div>
            <div>
                <p>Ksh. {amount}</p>
            </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
            <div>
            <p className="text-subtle-medium">Payment made on: {formatDateString(paymentMadeOn)}</p>
            <p className="text-subtle-medium">M-pesa no: {mpesaPhoneNumber}</p>
            </div>

            <p className="text-green-500"><GiConfirmed size={30} /></p>
        </div>
    </div>
  )
}

export default PaymentCard
