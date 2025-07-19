import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
interface ICreateCartForUser{
    userId:string;
}
const CreateCartForUser=async function({userId}:ICreateCartForUser) {
   const cart=await cartModel.create({userId,totalAmount:0});
   await cart.save();
   return cart;
};
interface IGetActiveCartForUser{
    userId:string;
}
export const GetActiveCartForUser=async function({userId}:IGetActiveCartForUser) {
     let cart=await cartModel.findOne({userId,status:"active"});
     if(!cart){
       cart=await CreateCartForUser({userId});
     }
     return cart;
};
interface IAddItemToCart{
  productId:any;
  quantity:number;
  userId:string;
}
export const addItemToCart=async function({productId,quantity,userId}:IAddItemToCart){
const cart=await GetActiveCartForUser({userId})
const exists_in_cart=cart.items.find(function(p){
p.product.toString()===productId
})
if(exists_in_cart){
  return{data:"Item already exists in cart",statuscode:400};
}
const product=await productModel.findById(productId)
if(!product){
  return{data:"Product not found",statuscode:400};
}
if(product.stock<quantity){
  return{data:"Low stock for item",statuscode:400};
}
cart.items.push({product:productId,unitprice:product.price,quantity:quantity})

cart.totalAmount +=product.price * quantity;
const updatedcart=await cart.save()

 return{data:updatedcart,statuscode:200};
}
interface IUpdateItemInCart{
  productId:any;
  quantity:number;
  userId:string;
}
export const updateItemInCart=async function ({productId,quantity,userId}:IUpdateItemInCart) {
  const cart=await GetActiveCartForUser({userId})
 const exists_in_cart = cart.items.find(function(p){
  return p.product.toString() === productId;
});

if(!exists_in_cart){
  return{data:"Item doesn't exist in cart",statuscode:400};
}
const product=await productModel.findById(productId)
if(!product){
  return{data:"Product not found",statuscode:400};
}
if(product.stock<quantity){
  return{data:"Low stock for item",statuscode:400};}
exists_in_cart.quantity=quantity
const otherCartItems=cart.items.filter(function(p){
 return p.product.toString() !== productId

})
let total = otherCartItems.reduce(function(sum,product){
  sum+=product.quantity * product.unitprice;
  return sum;
},0)
total+=exists_in_cart.quantity * exists_in_cart.unitprice;
cart.totalAmount=total
const updatedcart=await cart.save();
return {data:updatedcart,statuscode:200};
}