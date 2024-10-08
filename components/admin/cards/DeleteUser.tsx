'use client'
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/lib/actions/user.actions"



const DeleteUser = ({id}: { id: string}) => {

    async function removeUser(id: string) {
        const confirmWithUser = confirm('Are you sure you want to delete this account?')

        if(confirmWithUser) {
            try {
            
                deleteUser(id as any)
               

                alert("User deleted successfully")

            
            } catch (error: any) {
                throw new Error('Action failed due to: ' + error.message)
            }
        }

    }
  return (
    <Button
    className="flex-auto"
    onClick={() => removeUser(id)}
    >remove account</Button>
  )
}

export default DeleteUser
