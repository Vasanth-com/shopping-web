import express from 'express'
import cors from 'cors'
import "dotenv/config"
import { connectDb } from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userroute.js';
import productRouter from './routes/productroute.js';
import cartRouter from './routes/cartroute.js';
import orderRouter from './routes/orderroute.js';

// app config 

const app = express();
const port = process.env.PORT || 5000

// middleware 
app.use(express.json())
app.use(cors())


// db connection 

connectDb()
connectCloudinary()

// api endpoints 

app.use("/api/user",userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get("/",(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>{
    console.log(`Server running on PORT http://localhost:${port}`);
    
})