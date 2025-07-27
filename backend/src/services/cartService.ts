import cartModel from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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
    populateProduct?:boolean;
}
export const GetActiveCartForUser=async function({userId,populateProduct}:IGetActiveCartForUser) {
     let cart;
     if(populateProduct){
      cart=await cartModel.findOne({userId,status:"active"}).populate('items.product')
     }
     else{
      cart=await cartModel.findOne({userId,status:"active"});
     }
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
await cart.save()

 return{data:await GetActiveCartForUser({userId,populateProduct:true}),statuscode:200};
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
await cart.save();
return {data:await GetActiveCartForUser({userId,populateProduct:true}),statuscode:200};
}
interface IDeleteItemInCart{
  productId:any;
  userId:string;
}
export const deleteItemInCart=async function ({productId,userId}:IDeleteItemInCart){
  const cart=await GetActiveCartForUser({userId})
   const exists_in_cart = cart.items.find(function(p){
  return p.product.toString() === productId;
});

if(!exists_in_cart){
  return{data:"Item doesn't exist in cart",statuscode:400};
}
const otherCartItems=cart.items.filter(function(p){
 return p.product.toString() !== productId
})

const total = otherCartItems.reduce(function(sum,product){
  sum+=product.quantity * product.unitprice;
  return sum;
},0)
cart.items=otherCartItems;
cart.totalAmount=total
await cart.save();
return {data:await GetActiveCartForUser({userId,populateProduct:true}),statuscode:200};
}
interface IClearcart{
    userId:string;
}
export const clearCart=async function ({userId}:IClearcart){
  const cart=await GetActiveCartForUser({userId})
  cart.items=[];
  cart.totalAmount=0;
  const updatedcart=await cart.save();
  return {data:updatedcart,statuscode:200};
}
interface ICheckout{
    userId:string;
    address:string;
}
export const checkout=async function ({userId,address}:ICheckout){
  if(!address){
       return{data:"Please add the address",statuscode:400};}
  const cart=await GetActiveCartForUser({userId});
  const orderItems:IOrderItem[]=[]
  //loop in cart items and make order items
  for(const item of cart.items){
    const product=await productModel.findById(item.product)
    if(!product){
       return{data:"Product not found",statuscode:400};}
    const orderItem:IOrderItem={
      productTitle:product.title,
      productImage:product.image,
      quantity:item.quantity,
      unitPrice:item.unitprice
    }  
    orderItems.push(orderItem) 
  }
  const order=await orderModel.create({
     orderItems,
     total:cart.totalAmount,
     address,
     userId,
  });
  await order.save()
  //update cart status to be completed
  cart.status="completed";
  await cart.save()
   return {data:order,statuscode:200};
}