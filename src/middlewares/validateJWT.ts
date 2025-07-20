import {NextFunction, Request,Response} from "express"
import  jwt from "jsonwebtoken";
import userModel from "../models/userModel";
interface userrequest extends Request{
    user?:any;
}
const validateJWT=function(req:userrequest,res:Response,next:NextFunction){
const authorizationHeader=req.get('authorization');
if(!authorizationHeader){
    res.status(403).send("Authorization header was not provided");
    return;
}
const token=authorizationHeader.split(" ")[1]
if(!token){
    res.status(403).send("bearer token was not found");
    return;
}
jwt.verify(token,process.env.JWT_SECRET_KEY ||"",async function(err,payload){
    if(err){
    res.status(403).send("invalid token");
    return;
}
if(!payload){
    res.status(403).send("invalid token payload");
    return;
}
const userpayload=payload as {
    firstName:string;
    lastName:string;
    email:string;
}
const user=await userModel.findOne({email:userpayload.email})
req.user=user;
next();
});
};
export default validateJWT;