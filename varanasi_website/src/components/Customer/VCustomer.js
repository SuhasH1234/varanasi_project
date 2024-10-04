import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import im1 from '../../assessts/banaras.jpg';
import im5 from '../../assessts/Glass Beads.jpg';
import im7 from '../../assessts/Hand-Knotted Carpets.jpg';
import im9 from '../../assessts/Stone-Carved Curios.jpg';
import im10 from '../../assessts/Wooden Toys.jpg';
import im11 from '../../assessts/rm.jpg';
import { useState } from 'react';

function VCustomer() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProductsClick = () => {
    navigate('/product');
  };

  const handleEventsClick = () => {
    navigate('/event');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '0 20px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: 'black',
            flexGrow: 1,
          }}
        >
          Top Products
        </Typography>
      </Box>

      {/* Display error message if password is incorrect */}
      {error && (
        <Typography
          variant="body1"
          sx={{ color: 'red', marginBottom: '10px' }}
        >
          {error}
        </Typography>
      )}

      {/* Product Images */}
      <Box
        sx={{
          width: '70%',
          height: '450px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: 'auto',
        }}
      >
        <Box
          component="img"
          src={im1}
          alt="img1"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '0.5px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
        <Box
          component="img"
          src={im5}
          alt="img5"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
        <Box
          component="img"
          src={im9}
          alt="img9"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
        <Box
          component="img"
          src={im7}
          alt="img7"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
        <Box
          component="img"
          src={im11}
          alt="img11"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
        <Box
          component="img"
          src={im10}
          alt="im10"
          sx={{
            width: '15%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid black',
            transition: 'all ease-in-out 0.5s',
            '&:hover': {
              width: '25%',
            },
          }}
        />
      </Box>

      {/* Aligning Products and Events buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
        <button
          className='btn-1'
          onClick={handleProductsClick}
          style={{ marginRight: '10px' }} // Adds space between buttons
        >
          <div className="original">Products</div>
          <div className="letters">
            <span>P</span><span>R</span><span>O</span>
            <span>D</span><span>U</span><span>C</span><span>T</span><span>S</span>
          </div>
        </button>

        <button
          className='btn-1'
          onClick={handleEventsClick}
        >
          <div className="original">Events</div>
          <div className="letters">
            <span>E</span><span>V</span><span>E</span>
            <span>N</span><span>T</span><span>S</span>
          </div>
        </button>
      </Box>
    </Box>
  );
}

export default VCustomer;