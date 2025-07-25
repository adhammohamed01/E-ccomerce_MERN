import { createContext, useContext } from "react";

interface IAuthContextType{
    username:string | null;
    token:string | null;
    login:(username:string,token:string)=>void;
}
export const AuthContext=createContext<IAuthContextType>({username:null,token:null,login:()=>{}})
export const useAuth=()=>useContext(AuthContext);