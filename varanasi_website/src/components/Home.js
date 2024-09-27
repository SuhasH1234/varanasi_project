import React from 'react';
import { Box, Typography } from '@mui/material';
import i1 from '../assessts/download (1).jpg';
import i2 from '../assessts/download.jpg';
import i3 from '../assessts/OIP (1).jpg';
import i4 from '../assessts/OIP.jpg';
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const images = [
  i1, i2, i3, i4
];

function Home() {
  const { isAuthenticated } = useAuth0(); // Get authentication status
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Navigate to Artisan.js if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/artisan'); // Change '/artisan' to the correct route for Artisan.js
    }
  }, [isAuthenticated, navigate]);

  // Return null if the user is authenticated, so the Home component won't render
  if (isAuthenticated) {
    return null;
  }

  const imageArray = [...images, ...images];

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Varanasi Store
        </Typography>

        {/* Image Carousel */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '35%',
              height: '400px',
              animation: 'slide 15s linear infinite',
            }}
          >
            {imageArray.map((src, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Carousel Animation */}
        <style>
          {`
            @keyframes slide {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          `}
        </style>
      </Box>

      {/* Copyright Section  */}
      <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f5f5f5', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Varanasi. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Privacy Policy | Terms of Service
        </Typography>
      </Box>
    </>
  );
}

export default Home;