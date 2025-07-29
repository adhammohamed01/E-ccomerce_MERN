import userModel from "../models/userModel";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
interface Registerparams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
export const register=async function({firstName,lastName,email,password}: Registerparams){
    const findUser = await userModel.findOne({email:email})
    if(findUser){
        return {data:"User alreadt exists!",statusCode:400}
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new userModel({firstName,lastName,email,password:hashedPassword})
    await newUser.save()
    return {data:generateJwt({firstName,lastName,email}),statusCode:200};
}
interface Loginparams{
    email:string;
    password:string;
}
export const login=async function({email,password}: Loginparams){
    const findUser = await userModel.findOne({email:email})
    if(!findUser){
        return {data:"Incorrect email or password",statusCode:400}
    }
    const passwordMatch=await bcrypt.compare(password,findUser.password)
    if(passwordMatch){
        return {data:generateJwt({firstName:findUser.firstName,lastName:findUser.lastName,email}),statusCode:200}; 
        
    }
    return {data:"Incorrect email or password",statusCode:400}}

interface IgetMyorders{
    userId:string;
}
export const getMyorders=async function({userId}:IgetMyorders){
   try{
     const orders=await orderModel.find({userId});
     return {data:orders,statuscode:200};
   }
   catch(err){
      throw err
   }
}

const generateJwt=function(data:any){
        return jwt.sign(data,process.env.JWT_SECRET_KEY ||"")
    }