import React from 'react';
import { Box, Typography } from '@mui/material';
import im1 from '../assessts/banaras.jpg';
import im5 from '../assessts/Glass Beads.jpg';
import im7 from '../assessts/Hand-Knotted Carpets.jpg';
import im9 from '../assessts/Stone-Carved Curios.jpg';
import im10 from '../assessts/Wooden Toys.jpg';
import im11 from '../assessts/rm.jpg';
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Home() {
  const { isAuthenticated } = useAuth0(); // Get authentication status
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Navigate to Artisan.js if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/customer'); // Change '/artisan' to the correct route for Artisan.js
    }
  }, [isAuthenticated, navigate]);

  // Return null if the user is authenticated, so the Home component won't render
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            marginLeft: '35%'
          }}
        >
          <Typography variant="h4" 
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Welcome to the Varanasi Store
          </Typography>
        </Box>
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
      </Box>
    </>
  );
}

export default Home;