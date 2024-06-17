"use server"

import type { createNewNotification } from "@/interfaces";
import { connectToDB } from "../mongoose";
import Notification from "../models/notification.model";
import { fetchUserById } from "./user.actions";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewNotification({
    from,
    to,
    subject,
    message,
}: createNewNotification) {

    try {
        connectToDB()
        
       const notification =  new Notification({
        from,
        to, 
        subject,
        message,
        })

        await notification.save()
        
        //save the notification to the user receiving it
        const toUser = await fetchUserById(to)

        toUser.notifications.push(notification._id)

        await toUser.save()

    } catch (error: any) {
        throw new Error(`An error occurred creating new Notification: ${error.message}`)
    }
}

export async function readNotificationAction(id: ObjectId){

    try {
        const notification = await Notification.findById(id)

        notification.read = true

        await notification.save()

        revalidatePath("/admin/users")
        revalidatePath("/user/notifications")
    } catch (error: any) {
        throw new Error(`An error occurred reading Notification: ${error.message}`)
    }
}

export async function deleteNotificationAction({ 
    notificationId,
    toId,
    fromId
}: {
    notificationId: ObjectId
    toId: ObjectId
    fromId: ObjectId
}) {
    try {
        connectToDB()

        const toUser = await fetchUserById(toId)


        toUser.notifications = toUser.notifications.filter((notification: ObjectId) => notification.toString() !== notificationId.toString())


        await toUser.save()


        await Notification.findOneAndDelete({ _id: notificationId})

        return true
    } catch (error: any) {
        throw new Error(`An error occurred deleting Notification: ${error.message}`)
    }
}