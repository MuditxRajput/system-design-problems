import express from 'express'
import { rateLimiterMiddleware } from './middleware/middleware.js';
const app = express();
app.use('/rl',rateLimiterMiddleware,(req,res)=>res.send('running'));


app.listen(8080,()=>console.log(`Server is runing`))