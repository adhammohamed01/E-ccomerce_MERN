import  express from "express";
import { getAllproducts } from "../services/productService";
const router=express.Router()
router.get('/',async function(req,res){
try{
    const products=await getAllproducts();
    res.status(200).send(products);
}catch(err){
    res.status(500).send("Something went wrong!")
    }
 
})
export default router