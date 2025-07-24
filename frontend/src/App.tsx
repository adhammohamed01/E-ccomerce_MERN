import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Registerpage from "./pages/RegisterPage"



function App() {
 

  return (
   <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
         
         <Route/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
