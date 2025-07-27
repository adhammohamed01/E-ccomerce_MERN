
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../contex/Cart/CartContext';
interface props{
  id: string;
   title:string;
    image:string;
    price:number;
}
function Productcard({id,title,image,price}:props) {
  const{addItemToCart}=useCart();
  return (
    <Card >
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={()=>addItemToCart(id)}>Add to cart</Button>
    
      </CardActions>
    </Card>
  );
}
export default Productcard;
