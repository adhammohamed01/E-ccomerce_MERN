import { createContext, useContext } from "react";
import type { CartItem } from "../../types/cart";

interface IcartContextType{
  cartItems:CartItem[];
  totalAmount:number;
  addItemToCart:(prductId:string)=>void;
  updateItemToCart:(prductId:string,quantity:number)=>void;
}
export const CartContext=createContext<IcartContextType>({
   cartItems:[],
  totalAmount:0,
  addItemToCart:()=>{},
  updateItemToCart:()=>{}

})
export const useCart=()=>useContext(CartContext);