import { tokenBucketAlgo } from "../algos/tokenBucket.js"

export const rateLimiterMiddleware = async(req,res,next)=>{
   // here implement the different algos ..
//    const response = await 
try {
    const ip = req.ip;
    console.log(ip);
    
    const response = await tokenBucketAlgo(ip);
    console.log(response);
    
    if(!response.allowed) return res.status(500).json({msg:response.error})
    next();
} catch (error) {
    return res.status(500).json({msg:error.message})    
}
}