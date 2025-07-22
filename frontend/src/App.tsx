import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/HomePage"



function App() {
 

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
         
         <Route/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
