"use server"
import { connectToDB } from '@/lib/mongoose'
import User from '../models/user.model'

interface Params {
    name: string,
    email: string,
    image: string,
    password: string | ''
}
export async function createUser({
    name,
    email,
    image,
    password,
}: Params) {
    try {
        connectToDB()

        const user = new User({
            name: name,
            email: email,
            image: image,
            password: password
        })

      await user.save()

    } catch(error: any) {
        throw new Error(`Failed to create user: ${error.message}`)
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        const user = await User.findOne({ email: email })

        return user

    } catch (error: any) {
        throw new Error(`Unable to fetch user: ${error.message}`)
    }
}