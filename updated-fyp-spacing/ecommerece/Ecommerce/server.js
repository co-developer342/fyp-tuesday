import express from 'express'
// import color from 'colors' 
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from './Config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js' 
import productRoutes from './routes/productRoute.js'
import cors from "cors"


dotenv.config();

// rest object
const app=express();

//database config

connectDb();

// moddleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

// rest api
app.get('/',(req,res)=>{

    res.send("Hello")

 })

//  PORT
 const PORT=8080;
// run listen
 app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode at ${PORT}`.bgCyan.white)
 })