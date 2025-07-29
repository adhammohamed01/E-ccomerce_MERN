import { Box, Button, Container, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage=()=>{
    const {getMyorders,Myorders}=useAuth();
    useEffect(()=>{
       getMyorders();
    },[]);
    console.log("Myorders:", Myorders);
    const Navigate=useNavigate();
    const handleHome=()=>{
    Navigate("/")
  }
return (
    <Container sx={{mt:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,}}>
        {Myorders.map(({orderItems,address,total})=>(
            <Box sx={{border:1,borderColor:"gray",borderRadius:2,padding:1}}>
              <Typography>Address:{address}</Typography>
              <Typography>Number of items:{orderItems.length}</Typography>
              <Typography>Total:{total}</Typography>
            </Box>
        ))}
      <Button onClick={handleHome}>Go to home page</Button>
    </Container>
)
}
export default MyOrdersPage