import express from "express"
import mongoose from "mongoose"
import router from "./routes/UserRoute";

const app=express()
const port=3001;
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(function(){console.log('Mongo connected!')})
  .catch(function(err){console.log('Failed to connect',err)});

app.use('/user',router)

  app.listen(port,function(){
    console.log(`server is running at: http://localhost:${port}`)
})