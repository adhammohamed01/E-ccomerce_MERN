import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useCart } from "../contex/Cart/CartContext"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";


const Cartpage=()=>{
   const Navigate=useNavigate();
    const handlecheckout=()=>{
    Navigate("/checkout")
  }
    const {cartItems,totalAmount,updateItemToCart,removeItemInCart,clearCart}=useCart();
    const handleQuantity=(productId:string,quantity:number)=>{
        if(quantity <= 0){
          return;
        }
        updateItemToCart(productId,quantity)
    }
    const handleRemoveItem=(productId:string)=>{
       
        removeItemInCart(productId);
    }
    const handleClearItem =()=>{
      clearCart();
    }

    return ( <Container>
           
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 4, width: "100%" ,mb:4}}>
              <Button 
                onClick={() => handleClearItem()} 
                variant="outlined" 
                color="error" 
                sx={{ ml: 2 }}
              >
                Clear item
              </Button>

              <Typography variant="h4" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                My Cart
              </Typography>
            </Box>
            {cartItems.length ? <>
                <Box sx={{display:"flex",flexDirection:"column"}} gap={4}>
                 {cartItems.map((item)=>(
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",border:3
                    ,borderColor:"#f2f2f2",borderRadius:5,padding:1}} gap={1}>
                       <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <img src={item.image} width={75}/>
                        <Box>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography>{item.unitprice}*{item.quantity} EGP</Typography>
                        </Box>
                        </Box> 
                         <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={()=>handleQuantity(item.productId,item.quantity + 1)}>+</Button>
                                <Button onClick={()=>handleQuantity(item.productId,item.quantity - 1)}>-</Button>
                         </ButtonGroup>
                         <Button onClick={()=>handleRemoveItem(item.productId)} 
                         variant="outlined" color="error">Remove item</Button>
                    </Box>
                     
                 ))} 
                   <Box  sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant="h4">Total Amount:{totalAmount}EGP</Typography>
                    <Button variant="contained" onClick={handlecheckout}>Go to checkout</Button>
                   </Box>
                 </Box></>:(<Typography variant="h4">cart is empty please start shoping and add items</Typography>)}                 
           
           
        </Container>)
}
export default Cartpage