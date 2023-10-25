
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, fetchUserByEmail } from '@/lib/actions/user.actions'
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as any,
            clientSecret: process.env.GOOGLE_SECRET as any
        })
    ],
    callbacks: {
        async session({session}) {

            return session
        },
        async signIn({profile}: any) {
            console.log(profile)

            try{
                const userExists = await fetchUserByEmail(profile.email)
                if(!userExists || userExists === null) {
                    createUser({
                        name: profile.name as string,
                        email: profile.email as string,
                        image: profile.picture as string,
                        password: ''      
                    })
                }

                return true

            } catch(error: any) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }