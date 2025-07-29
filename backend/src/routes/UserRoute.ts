import express from "express"
import {Request} from "express"
import { getMyorders, login, register } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
interface userrequest extends Request{
    user?:any;
}
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
user_router.get("/my-orders",validateJWT,async function(req:userrequest,res){
       try{
               const userId=req.user._id;   
               const orders=await getMyorders({userId});
               res.status(200).send(orders);
           }catch(err){
               res.status(500).send("Something went wrong!")
           }
})
export default user_router;