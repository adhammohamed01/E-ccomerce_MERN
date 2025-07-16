import express from "express"
import mongoose from "mongoose"
import { seedInitialProducts } from "./services/productService";
import user_router from "./routes/UserRoute";
import productRouter from "./routes/ProductRoute";

const app=express()
const port=3001;
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(function(){console.log('Mongo connected!')})
  .catch(function(err){console.log('Failed to connect',err)});

seedInitialProducts()
app.use('/user',user_router)
app.use('/product',productRouter)
  app.listen(port,function(){
    console.log(`server is running at: http://localhost:${port}`)
})