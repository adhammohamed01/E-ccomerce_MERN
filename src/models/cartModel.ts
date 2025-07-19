import mongoose ,{Schema,ObjectId,Document} from "mongoose";
import { IProduct } from "./productModel";
const CartStatusEnum=["active","completed"]
export interface ICartItem {
    product:IProduct;
    unitprice:number;
    quantity:number;
}
export interface ICart extends Document{
    userId:string | ObjectId;
    items:ICartItem[];
    totalAmount:number;
    status:"active"|"completed";
}
const cartItemSchema=new Schema <ICartItem>({
    product:{type:Schema.Types.ObjectId,ref:"product",required:true},
    quantity:{type:Number,required:true,default:1},
    unitprice:{type:Number,required:true},

});
const cartSchema=new Schema <ICart>({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:CartStatusEnum,default:"active"}

});
const cartModel=mongoose.model<ICart>('Cart',cartSchema);
export default cartModel;