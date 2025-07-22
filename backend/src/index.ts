import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { seedInitialProducts } from "./services/productService";
import user_router from "./routes/UserRoute";
import productRouter from "./routes/ProductRoute";
import cartRouter from "./routes/cartRoute";
dotenv.config();
const app=express()
const port=3001;
app.use(express.json())
mongoose.connect(process.env.DATABASE_URL ||"")
  .then(function(){console.log('Mongo connected!')})
  .catch(function(err){console.log('Failed to connect',err)});

seedInitialProducts()
app.use('/user',user_router)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
  app.listen(port,function(){
    console.log(`server is running at: http://localhost:${port}`)
})