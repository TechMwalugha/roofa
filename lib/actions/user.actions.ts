"use server"
import { connectToDB } from '@/lib/mongoose'
import User from '../models/user.model'

interface Params {
    name: string,
    email: string,
    image: string,
    password: string | '',
    signInType: 'google' | 'credentials',
    isEmailVerified: boolean,
}
export async function createUser({
    name,
    email,
    image,
    password,
    signInType,
    isEmailVerified,
}: Params) {
    try {
       connectToDB()

        const user = new User({
            name: name,
            email: email,
            image: image,
            password: password,
            signInType: signInType,
            isEmailVerified: isEmailVerified,
        })

      await user.save()

      return user

    } catch(error: any) {
        throw new Error(`Failed to create user: ${error.message}`)
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        connectToDB()
        const user = await User.findOne({ email: email })

        return user

    } catch (error: any) {
        throw new Error(`Unable to fetch user: ${error.message}`)
    }
}