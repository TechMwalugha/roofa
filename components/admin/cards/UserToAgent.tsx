
'use client'

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
    <button 
           className="bg-blue hover:bg-blue-400 capitalize text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
           onClick={() => userToAgent()}
           >
            change to {role === 'user' ? 'Agent' : 'user'}
    </button>
  )
}

export default UserToAgent
