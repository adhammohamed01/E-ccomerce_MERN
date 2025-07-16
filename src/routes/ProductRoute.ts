import  express from "express";
import { getAllproducts } from "../services/productService";
const router=express.Router()
router.get('/',async function(req,res){
 const products=await getAllproducts();
 res.status(200).send(products);
})
export default router