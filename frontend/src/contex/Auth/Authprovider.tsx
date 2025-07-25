import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const Authprovider:FC<PropsWithChildren>=({children})=>{
    
const [username,setUsername]=useState<string|null>(localStorage.getItem("username"));
const [token,setToken]=useState<string|null>(localStorage.getItem("token"));
const login=(username:string,token:string)=>{
    setUsername(username);
    setToken(token);
    localStorage.setItem('username',username);
    localStorage.setItem('token',token);
};
const logout=()=>{
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  setUsername(null);
  setToken(null);
}
 const isAuthenticated=!!token;
return(
    <AuthContext.Provider value={{username,token,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>
)
}
export  default Authprovider;