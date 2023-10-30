
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, fetchUserByEmail } from '@/lib/actions/user.actions'
import CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const handler = NextAuth({
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#67C1CA", // Hex color code
        logo: "/assets/roofalogo.png", // Absolute URL to image
        buttonText: "#FF5A5A" // Hex color code
      },
      pages: {
        signIn: "/login",
      },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as any,
            clientSecret: process.env.GOOGLE_SECRET as any
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // username: {
                //     label: "Email:",
                //     type: "email",
                //     placeholder: "manu@gmail.com"
                // },
                // password: {
                //     label: "Password:",
                //     type: "password",
                //     placeholder: "********"
                // }
            },
            async authorize(credentials: any) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = await fetchUserByEmail(credentials?.email as string)
                if(user) {
                    if(user.signInType !== 'credentials') throw new Error('Email uses google sign in')

                    const passwordsMatch = await bcrypt.compare(credentials?.password as string, user.password);

                    if (!passwordsMatch) {
                        throw new Error('Password does not match')
                    }


                    return user
                } else {
                    throw new Error('User does not exist')
                    // return null
                }
            }
        })
    ],
    callbacks: {
        async session({session}: any) {
            if(session.user !== undefined && session.user !== null ) {
             const sessionUser = await fetchUserByEmail(session.user.email as string)

             session.user.id = sessionUser._id
            }

            return session
        },
        async signIn({profile}: any) {
            if(profile === undefined ) return true

            try{
                const userExists = await fetchUserByEmail(profile.email)
                if(!userExists || userExists === null) {
                    createUser({
                        name: profile.name as string,
                        email: profile.email as string,
                        image: profile.picture as string,
                        password: '',
                        signInType: 'google',
                        isEmailVerified: true      
                    })
                }
                const user = await fetchUserByEmail(profile.email)

                if(user.signInType !== 'google') throw new Error('Email uses credentials to sign in')

                return true

            } catch(error: any) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }