import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useCart } from "../contex/Cart/CartContext"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Cartpage=()=>{
   
    const {cartItems,totalAmount,updateItemToCart,removeItemInCart}=useCart();
    const handleQuantity=(productId:string,quantity:number)=>{
        if(quantity <= 0){
          return;
        }
        updateItemToCart(productId,quantity)
    }
    const handleRemoveItem=(productId:string)=>{
       
        removeItemInCart(productId);
    }
    

    return ( <Container >
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", mt:4}}>
                 <Typography variant="h4">My cart</Typography> 
                  </Box>
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
                   <Box>
                    <Typography variant="h4">Total Amount:{totalAmount}EGP</Typography>
                   </Box>
                 </Box>                 
           
           
        </Container>)
}
export default Cartpage