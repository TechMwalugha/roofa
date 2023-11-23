"use client"
import { Button } from "@/components/ui/button"
import { suspendUser } from "@/lib/actions/user.actions"


const SuspendUser = ({ id, accountStatus } : { id: string, accountStatus: boolean}) => {
    
  return (

    <Button
    className="flex-auto"
    onClick={() => suspendUserFun(id, !accountStatus)}
    >
      {`${accountStatus ? 'Suspend Account' : 'Unsuspend Account'}`}
    </Button>
    
  )
}

export default SuspendUser


async function suspendUserFun (id: string, newAccountStatus: boolean) {
    let confirmWithUser = confirm(`Are you sure you want to ${newAccountStatus ? 'Unsuspend Account' : 'Suspend Account'}`)

    if(confirmWithUser) {
        suspendUser({id, newAccountStatus})
    }
}