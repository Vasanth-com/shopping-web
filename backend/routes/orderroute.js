import express from 'express'
import {allOrders,updateStatus,placeOrder,placeOrderStripe,userOrders, verifyStripe} from '../controllers/ordercontroller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// admin features

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment method features

orderRouter.post('/place',authUser,placeOrder) // cash on delivery
orderRouter.post('/stripe',authUser,placeOrderStripe) // stripe

// user features

orderRouter.post("/userorders",authUser,userOrders)


// verify payment

orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter