import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useAuth } from "../contex/Auth/AuthContext"
import { useCart } from "../contex/Cart/CartContext"

const Cartpage=()=>{
    const [cart,setcart]=useState();
    const [error,setError]=useState("");
    const {cartItems,totalAmount}=useCart();
    const{token}=useAuth()
    

    return ( <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", mt:4}}>
                 <Typography variant="h4">My cart</Typography> 
                 {cartItems.map((item)=>(
                    <Box key={item.productId}>{item.title}</Box>
                 ))}                 
            </Box>
           
        </Container>)
}
export default Cartpage