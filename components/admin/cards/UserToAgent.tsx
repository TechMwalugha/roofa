
'use client'

import { Button } from "@/components/ui/button"
import { updateUserRole } from "@/lib/actions/user.actions"




const UserToAgent = (
    {id, role } : 
    { 
        id : string
        role: string
    }
    ) => {

        function userToAgent() {
            const confirmWithUser = confirm(`Are you sure you want to change this account to:  ${role === 'user' ? 'Agent' : 'User'}?`)

            if(confirmWithUser) {
                try {
                    const newRole = role === 'user' ? 'roofa-agent' : 'user'
                
                    updateUserRole({id, newRole})
                
                } catch (error: any) {
                    throw new Error('Action failed due to: ' + error.message)
                }
            }
        }
    
  return (
    <Button 
           className="capitalize flex-auto"
           onClick={() => userToAgent()}
           >
            change to {role === 'user' ? 'Agent' : 'user'}
    </Button>
  )
}

export default UserToAgent
