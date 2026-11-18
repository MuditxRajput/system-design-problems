import { redis } from "../config/redis.js"

export const tokenBucketAlgo =async (ip)=>{
    const key = `tokenBucket:post:${ip}`
    const capacity = 2;
    const refillRate = 2;
    try {
      const existed = await redis.exists(key);
      if(existed)
      {
        const info = await redis.hgetall(key);
        let currentToken = Number(info.tokens);
        const timeDiff = (Date.now() - Number(info.updatedTime))/1000;
        currentToken = Math.min(capacity , currentToken + refillRate * timeDiff);
        if(currentToken>=1)
        {
            // allowed..
            await redis.hset(key,{tokens:currentToken-1,updatedTime:Date.now()})
            await redis.expire(key,6);
            return {allowed:true}
        }
        else throw new Error('Too many req')
      }
      else{
        await redis.hset(key,{updatedTime:Date.now(),tokens : capacity-1 });
        await redis.expire(key,6);
        return {allowed:true};
      }
    } catch (error) {
        return {allowed:false,error:error.message}
    }

}