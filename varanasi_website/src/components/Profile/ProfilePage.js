import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Paper } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import { motion } from 'framer-motion'; // Import motion for animation

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  padding: theme.spacing(3),
  textAlign: 'center',
  maxWidth: '500px',
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: theme.spacing(4),
}));

const animationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || 'Guest'; // Get userName or default to 'Guest'

  // Voice command
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
    <KeyboardBackspaceOutlinedIcon
        variant="contained"
        sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/')}
    />
    <ProfileBox>

      {/* Animated container using Framer Motion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
      >
        <StyledPaper elevation={3}>
        {/* Flex container for Avatar and Typography */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#7c0a02', width: 60, height: 60, mr: '5%' }}>
            <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Profile
            </Typography>
        </Box>

          <Typography variant="h6" sx={{ color: '#333', mb: 4 }}>
            Welcome, {userName} to the Varanasi Official Store!
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7c0a02',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#650501',
              },
            }}
            onClick={() => speak(`Hello, ${userName}. We Welcome you to the Varanasi Official Store!. Hope you will love exploring our site`)}
          >
            Click Me !
          </Button>
        </StyledPaper>
      </motion.div>
    </ProfileBox>
    </>
  );
}
export default ProfilePage;
