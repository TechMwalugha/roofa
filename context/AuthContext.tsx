
import { useContext, createContext, useState, useEffect, ReactNode } from "react"

type StateContextType = {
  user: string
}

const AuthContext = createContext<StateContextType | null>(null)

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState('Emmanuel')

  return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}