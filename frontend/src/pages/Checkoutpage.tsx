import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useCart } from "../contex/Cart/CartContext"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { TextField } from "@mui/material";
import { useAuth } from "../contex/Auth/AuthContext";


const Checkoutpage=()=>{
    const adressRef=useRef<HTMLInputElement>(null);
    const Navigate=useNavigate();
    const{token}=useAuth()
    const handleConfirmOrder=async()=>{
        const address=adressRef.current?.value;
        if(!address){return;}
        const response = await fetch("http://localhost:3001/cart/checkout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        address
      })
    });

    if (!response.ok) {
      return;
    }
    Navigate('/order-success')
    }
  
    const {cartItems,totalAmount}=useCart();
   
    return ( <Container>
           
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 4, width: "100%" ,mb:4}}>

              <Typography variant="h4" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                Checkout
              </Typography>
            </Box>
                <Box sx={{display:"flex",flexDirection:"column"}} gap={2}>
                 <TextField inputRef={adressRef} label="Delivary address" name="address"/>   
                 {cartItems.map((item)=>(
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",border:3
                    ,borderColor:"#f2f2f2",borderRadius:5,padding:1}} gap={1}>
                       <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <img src={item.image} width={75}/>
                        <Box>
                        <Typography variant="h6">{item.title}</Typography>
                        </Box>
                        </Box>
                        <Box>
                        <Typography  sx={{display:"flex",flexDirection:"row"}}>{item.unitprice}*{item.quantity} EGP</Typography>
                        </Box> 
                    </Box>
                     
                 ))} 
                   <Box  sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Button sx={{ position: "absolute", left: "47%"}} variant="contained" onClick={handleConfirmOrder}>Pay now</Button>
                    <Typography sx={{ position: "absolute", left: "77%"}} variant="h6">Total Amount:{totalAmount}EGP</Typography>
                    
                   </Box>
                 </Box>               
           
           
        </Container>)
}
export default Checkoutpage