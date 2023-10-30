"use server"
import { connectToDB } from '@/lib/mongoose'
import User from '../models/user.model'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'

interface createUserProps {
    name: string,
    email: string,
    image: string,
    password: string | '',
    signInType: 'google' | 'credentials',
    isEmailVerified: boolean,
}
interface updateUserProps {
    id: mongoose.Schema.Types.ObjectId
    name: string
    email: string 
    image: string 
    password: string
    isEmailVerified: boolean 
    verificationToken: string 
    role: string 
    accountStatus: boolean
}

export async function createUser({
    name,
    email,
    image,
    password,
    signInType,
    isEmailVerified,
}: createUserProps) {
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

export async function updateUser(
    {id, name, email, image, password, isEmailVerified, verificationToken, role, accountStatus}: updateUserProps
    ) {
    try {
        connectToDB()

        const user = await User.findById(id)

        if(!user) return null

        user.name = name
        user.email = email
        user.image = image
        user.password = password
        user.isEmailVerified = isEmailVerified
        user.verificationToken = verificationToken
        user.role = role
        user.accountStatus = accountStatus
        
        await user.save()


    } catch (error: any) {
        throw new Error(`Unable to update user: ${error.message}`)
    }
}