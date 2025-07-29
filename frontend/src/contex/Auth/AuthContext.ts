import { createContext, useContext } from "react";

interface IAuthContextType{
    username:string | null;
    token:string | null;
    isAuthenticated:boolean;
    Myorders:any[];
    login:(username:string,token:string)=>void;
    logout:()=>void;
    getMyorders:()=>void;
}
export const AuthContext=createContext<IAuthContextType>(
    {username:null,token:null,isAuthenticated:false,Myorders:[],login:()=>{},logout:()=>{},getMyorders:()=>{}})
export const useAuth=()=>useContext(AuthContext);