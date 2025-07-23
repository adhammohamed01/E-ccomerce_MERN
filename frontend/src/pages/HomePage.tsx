import  Grid  from "@mui/material/Grid";
import Container  from "@mui/material/Container";
import Productcard from "../components/Productcard";
import { useEffect, useState } from "react";
import type { product } from "../types/product";
import { Box } from "@mui/material";

const Homepage=()=>{
  const [products,setproducts]=useState<product[]>([]);
  const [error,setError]=useState(false);
 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/product");
        const data = await response.json();
        setproducts(data);
      } catch (err) {
        setError(true);
      }
    };
    fetchProducts();
  }, []);
  if(error){
    return <Box>something went wrong</Box>
  }
  return( <Container sx={{mt:2}}>
    <Grid container spacing={2}>
      {
        products.map(({_id,title,image,price})=>(<Grid size={{md:4}}><Productcard id={_id} title={title} image={image} price={price}/></Grid>))
      }
    </Grid>
  </Container>)
};
export default Homepage;