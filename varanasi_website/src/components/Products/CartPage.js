import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';

function CartPage({ cart, removeFromCart }) {
    const navigate = useNavigate();
    const totalAmount = cart.length * 543; // Assuming each product costs ₹543

  return (
    <>
    <KeyboardBackspaceOutlinedIcon
        variant="contained"
        sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/product')}
    />
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <List>
            {cart.map((product, index) => (
              <ListItem key={index}>
                <ListItemText primary={product} />
                <Button onClick={() => removeFromCart(index)}>Remove</Button>
              </ListItem>
            ))}
          </List>
          <h2>Total Price: ₹{totalAmount}</h2>
          <Button variant="contained" color="primary">Buy</Button>
        </>
      )}
    </div>
    </>
  );
}

export default CartPage;
