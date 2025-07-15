import express from "express"
import { login, register } from "../services/userService";

const router=express.Router();

router.post("/register",async function(request,response){
    const{firstName,lastName,email,password} =request.body;
    const result=await register({firstName,lastName,email,password});
    response.status(result.statusCode).send(result.data);
});
router.post("/login",async function(request,response){
    const{email,password} =request.body;
    const result=await login({email,password});
    response.status(result.statusCode).send(result.data);
});
export default router;