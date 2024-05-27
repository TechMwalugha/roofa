import  { Redis }  from "@upstash/redis"
import { Ratelimit }  from "@upstash/ratelimit";

const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
})

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5m")
})

export async function checkForRateLimit({ ip } : { ip: any }) {
    try {
        const {remaining, limit, success} = await rateLimit.limit(ip!)

        if(!success) {
            return  false
        }

        return true

    } catch (error: any) {
       throw new Error(`An error occurred while generating rate limits`)
    }
}