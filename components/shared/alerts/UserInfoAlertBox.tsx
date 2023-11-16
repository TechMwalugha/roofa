import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { FcGoogle } from 'react-icons/fc'
  import { FaLockOpen } from "react-icons/fa6";
  import { MdVerified } from "react-icons/md";
  
  export default function UserInfoAlertBox( {
    signInType,
    isEmailVerified,
    role,
    accountStatus,
  }: {
    signInType: 'google' | 'credentials'
    isEmailVerified: boolean
    role: string
    accountStatus: boolean
  }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-blue">More Info</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>here is your static info:</AlertDialogTitle>
            <AlertDialogDescription className="bg-blue p-2 rounded-sm my-1">
             {
                signInType === 'google' &&  (
                    <>
                    <span className="flex items-center gap-4">sign in method: < FcGoogle size={20} className="bg-white shadow-lg" /> {signInType}</span>
                    <p className="text-subtle-medium mt-2">Use `Login with Google` while signing in</p>
                    </>
                )
             }
             {
                signInType === 'credentials' &&  (
                    <>
                    <span className="flex items-center gap-4">sign in method: <FaLockOpen size={20} className="bg-white shadow-lg"/> {signInType}</span>
                    <p className="text-subtle-medium mt-2">Use email and password while signing in</p>
                    </>
                )
             }
            </AlertDialogDescription>
            <AlertDialogDescription className=" p-2 rounded-sm my-1">
              { isEmailVerified ? (
                <p className="flex items-center gap-3">Big ups email is <MdVerified size={20} className="bg-white shadow-lg" /> </p>
              ): (
                <p>email not verified</p>
              )}
            </AlertDialogDescription>
            <AlertDialogDescription className="bg-blue p-2 rounded-sm my-1">
             <p> our esteemed: {`${role === 'user' ? 'customer' : 'agent'}`}</p>
            </AlertDialogDescription>
            <AlertDialogDescription className=" p-2 rounded-sm my-1">
             <p> {`${accountStatus ? 'Account Status: active': 'Account Status: suspended'}`}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  