import express from "express"
import { login, register } from "../services/userService";

const user_router=express.Router();

user_router.post("/register",async function(request,response){
    try{
        const{firstName,lastName,email,password} =request.body;
        const result=await register({firstName,lastName,email,password});
        response.status(result.statusCode).json(result.data);
    }catch(err){
        response.status(500).send("Something went wrong!")
    }
    
});
user_router.post("/login",async function(request,response){
    try{
        const{email,password} =request.body;
        const result=await login({email,password});
        response.status(result.statusCode).json(result.data);
    }catch(err){
        response.status(500).send("Something went wrong!")
    }
    
});
export default user_router;