import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useAuth } from "../contex/Auth/AuthContext"

const Cartpage=()=>{
    const [cart,setcart]=useState();
    const [error,setError]=useState("");
    const{token}=useAuth()
    useEffect(() => {
        if(!token){
            return;
        }
        const fetchcarts = async () => {
            const response = await fetch("http://localhost:3001/cart",{
                headers:{
                    'Authentication':`Bearer${token}`
                }
            });
            if(!response.ok){
                setError("Failed to fetch user cart");
            }
            const data = await response.json();
            setcart(data);}
        fetchcarts();
      }, [token]);

    return ( <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", mt:4}}>
                 <Typography variant="h4">My cart</Typography>                  
            </Box>
           
        </Container>)
}
export default Cartpage