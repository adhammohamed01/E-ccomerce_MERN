import  express from "express";
import {Request} from "express"
import { addItemToCart, GetActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
interface userrequest extends Request{
    user?:any;
}

const router=express.Router();

router.get('/',validateJWT,async function(req:userrequest,res){
 const userId=req.user._id;   
 const cart=await GetActiveCartForUser({userId});
 res.status(200).send(cart);
})
router.post('/items',validateJWT,async function(req:userrequest,res){
    const userId=req.user._id;
    const{productId,quantity}=req.body;
    const response=await addItemToCart({userId,productId,quantity})
    res.status(response.statuscode).send(response.data);
})
export default router;