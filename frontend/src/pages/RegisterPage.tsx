import Typography  from "@mui/material/Typography";
import Container  from "@mui/material/Container";
import Box  from "@mui/material/Box";
import TextField  from "@mui/material/TextField";
import Button  from "@mui/material/Button";
import { useRef, useState } from "react";
const Registerpage=()=>{
    const [error,setError]=useState("");
    const firstNameRef=useRef<HTMLInputElement>(null);
    const lastNameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const onSubmit=async()=>{
        const firstName=firstNameRef.current?.value;
        const lastName=lastNameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;

        const response=await fetch("http://localhost:3001/user/register",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
        if(!response.ok){
            setError("Unable to register user,please try different crediential!")
            return;
        }
    }
    return(
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", mt:4}}>
                 <Typography variant="h4">Register new account</Typography>
                 <Box sx={{display:"flex",flexDirection:"column",gap:2,mt:2,border:1,borderColor:"#f5f5f5",p:2}}>
                    <TextField inputRef={firstNameRef} label="First Name" name="firstName"/>
                    <TextField inputRef={lastNameRef} label="Last Name" name="lastName"/>
                    <TextField inputRef={emailRef} label="Email" name="email"/>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"/>
                    <Button onClick={onSubmit} variant="contained">Register</Button>
                    {error && (<Typography sx={{ color: "red" }}>{error}</Typography> )}
                 </Box>
            </Box>
           
        </Container>
    )
}
export default Registerpage;