import Typography  from "@mui/material/Typography";
import Container  from "@mui/material/Container";
import Box  from "@mui/material/Box";
import TextField  from "@mui/material/TextField";
import Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAuth } from "../contex/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const Loginpage=()=>{
    const [error,setError]=useState("");
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const Navigate=useNavigate();
    const {login}=useAuth();

    const onSubmit=async()=>{
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;
        if(!email || !password){
            return;
        }
        const response=await fetch("http://localhost:3001/user/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        if(!response.ok){
            setError("Unable to login user,please try different crediential!")
            return;
        }
        const token=await response.json();
        if(!token){
            setError("Incorrect token")
            return;
        }
        login(email,token);
        Navigate("/")
    }

    return(
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", mt:4}}>
                 <Typography variant="h6">Login to your account</Typography>
                 <Box sx={{display:"flex",flexDirection:"column",gap:2,mt:2,border:1,borderColor:"#f5f5f5",p:2}}>
                    <TextField inputRef={emailRef} label="Email" name="email"/>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"/>
                    <Button onClick={onSubmit} variant="contained">Log in</Button>
                    {error && (<Typography sx={{ color: "red" }}>{error}</Typography> )}
                 </Box>
            </Box>
           
        </Container>
    )
}
export default Loginpage;