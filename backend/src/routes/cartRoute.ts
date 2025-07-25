import  express from "express";
import {Request} from "express"
import { addItemToCart, checkout, clearCart, deleteItemInCart, GetActiveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
interface userrequest extends Request{
    user?:any;
}

const router=express.Router();

router.get('/',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;   
        const cart=await GetActiveCartForUser({userId});
        res.status(200).send(cart);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }

})
router.post('/items',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;
        const{productId,quantity}=req.body;
        const response=await addItemToCart({userId,productId,quantity})
        res.status(response.statuscode).send(response.data);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
    
})
router.put('/items',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;
        const{productId,quantity}=req.body;
        const response=await updateItemInCart({userId,productId,quantity})
        res.status(response.statuscode).send(response.data);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
    
})
router.delete('/items/:productId',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;
        const{productId}=req.params;
        const response=await deleteItemInCart({userId,productId})
        res.status(response.statuscode).send(response.data);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
    
})

router.delete('/',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;
        const response=await clearCart({userId})
        res.status(response.statuscode).send(response.data);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
    
})
router.post('/checkout',validateJWT,async function(req:userrequest,res){
    try{
        const userId=req.user._id;
        const {address}=req.body;
        const response=await checkout({userId,address})
        res.status(response.statuscode).send(response.data);
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
    
})
export default router;