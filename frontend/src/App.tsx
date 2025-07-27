import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Registerpage from "./pages/RegisterPage"
import Loginpage from "./pages/Loginpage"
import Authprovider from "./contex/Auth/Authprovider"
import Cartpage from "./pages/Cartpage"
import ProtectedRoute from "./components/Protectedroute"
import Cartprovider from "./contex/Cart/Cartprovider"

function App() {

  return (
  <Authprovider>
  <Cartprovider>
   <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
         <Route path="/login" element={<Loginpage/>}/> 
         <Route element={<ProtectedRoute/>}>
         <Route path="/cart" element={<Cartpage/>}/>
         </Route>
      </Routes>
   </BrowserRouter>
   </Cartprovider>
   </Authprovider>
  )
}

export default App
