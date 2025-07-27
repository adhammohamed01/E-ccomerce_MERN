import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/cart";
import { useAuth } from "../Auth/AuthContext";

const Cartprovider:FC<PropsWithChildren>=({children})=>{
const [cartItems,setCartItems]=useState<CartItem[]>([]);
const [totalAmount,setTotalAmount]=useState<number>(0);  
const [error,setError]=useState("");
const{token}=useAuth()
useEffect(() => {
        if(!token){
            return;
        }
        const fetchcarts = async () => {
            const response = await fetch("http://localhost:3001/cart",{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!response.ok){
                setError("Failed to fetch user cart");
            }
            const cart=await response.json();
            const cartItemsMapped=cart.items.map(({product,quantity,unitprice}:{product:any,quantity:number,unitprice:number})=>
              ({productId:product._id,title:product.title,image:product.image,quantity,unitprice}))  
                  setCartItems(cartItemsMapped);
                  setTotalAmount(cart.totalAmount);
                }
              fetchcarts();
      }, [token]);
const addItemToCart = async (productId: string) => {
  try {
    const alreadyInCart = cartItems.some(item => item.productId === productId);
    if (alreadyInCart) {
      setError("Product is already in the cart");
      console.log(error)
      return;
    }

    
    const response = await fetch("http://localhost:3001/cart/items", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity: 1
      })
    });

    if (!response.ok) {
      setError("Failed to add to cart");
      return;
    }

    const cart = await response.json();
    if (!cart) {
      setError("Failed to parse cart");
      return;
    }

    const cartItemsMapped = cart.items.map(
      ({ product, quantity, unitprice }: { product: any, quantity: number, unitprice: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitprice
      })
    );

    setCartItems([...cartItemsMapped]);
    setTotalAmount(cart.totalAmount);
  } catch (error) {
    console.log(error);
  }
};
const updateItemToCart = async (productId: string,quantity:number) => {
  try {
    console.log(token);
    const response = await fetch("http://localhost:3001/cart/items", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity
      })
    });

    if (!response.ok) {
      setError("Failed to add to cart");
      return;
    }

    const cart = await response.json();
    if (!cart) {
      setError("Failed to parse cart");
      return;
    }

    const cartItemsMapped = cart.items.map(
      ({ product, quantity, unitprice }: { product: any, quantity: number, unitprice: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitprice
      })
    );

    setCartItems([...cartItemsMapped]);
    setTotalAmount(cart.totalAmount);
  } catch (error) {
    console.log(error);
  }
};
const removeItemInCart=async (productId: string) => {
  try {
    console.log(token);
    const response = await fetch(`http://localhost:3001/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      },
   
    });

    if (!response.ok) {
      setError("Failed to delete to cart");
      return;
    }

    const cart = await response.json();
    if (!cart) {
      setError("Failed to parse cart");
      return;
    }

    const cartItemsMapped = cart.items.map(
      ({ product, quantity, unitprice }: { product: any, quantity: number, unitprice: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitprice
      })
    );

    setCartItems([...cartItemsMapped]);
    setTotalAmount(cart.totalAmount);
  } catch (error) {
    console.log(error);
  }
};
return(
    <CartContext.Provider value={{cartItems,totalAmount,addItemToCart,updateItemToCart,removeItemInCart}}>{children}</CartContext.Provider>
)
}
export  default Cartprovider;