import { CheckCircleOutline } from "@mui/icons-material"
import { Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

const OrderSuccesspage=()=>{
    const Navigate=useNavigate();
    const handleHome=()=>{
    Navigate("/")
  }
return (
    <Container sx={{mt:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,}}>
      <CheckCircleOutline sx={{color:"green",fontSize:"80px"}}/>
      <Typography variant="h4">Thanks for your order</Typography>
      <Typography >we started processing it,and we will get back to you soon</Typography>
      <Button onClick={handleHome}>Go to home page</Button>
    </Container>
)
}
export default OrderSuccesspage