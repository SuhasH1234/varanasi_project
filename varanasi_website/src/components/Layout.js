import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Typography, Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css'; // Import your custom CSS
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logo from '../assessts/v logo.png';

function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      if (loginType === 'artisan') {
        navigate('/customer');  // Redirect to Artisan page
      }
      setLoginType(null); // Reset loginType after navigating
    }
  }, [isAuthenticated, loginType, navigate]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleButtonClick = () => {
    const password = prompt('Enter the password:');
    const correctPassword = '1234'; //password

    if (password === correctPassword) {
      setError('');
      navigate('/artisan');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleAboutCompanyClick = () => {
    toggleDrawer();
    navigate('/about');
  };

  const handleHelpClick = () => {
    toggleDrawer();
    navigate('/contact');
  };

  const handleHomeClick = () => {
    toggleDrawer();
    navigate('/');
  };

  const handleProfileClick = () => {
    toggleDrawer();
    navigate('/profile', { state: { userName: user.name } }); // Pass user name in state
  };

  const handleProductClick = () => {
    toggleDrawer();
    navigate('/product');
  };

  const handleEventsClick = () => {
    toggleDrawer();
    navigate('/event');
  };

  const handleGamesClick = () => {
    toggleDrawer();
    navigate('/game');
  };

  const handleArtisanLogin = () => {
    setLoginType('customer');
    loginWithRedirect();
  };

  const handleCustomerLogin = () => {
    setLoginType('customer');
    loginWithRedirect();
  };

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ff0038' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', paddingRight: '75%'}}>
            <img src={logo} alt="Logo" style={{ height: '60px', width: 'auto' }} />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated && 
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {user.name}
              </Typography>}
            {
              isAuthenticated ? (
                <button className="btn-1" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  <div className="original">Log Out</div>
                  <div className="letters">
                    <span>L</span><span>O</span><span>G</span>
                    <span>O</span><span>U</span><span>T</span>
                  </div>
                </button>
              ) : (
                <button className="btn-1" onClick={openLoginDialog}>
                  <div className="original">Login/SignUp</div>
                  <div className="letters">
                    <span>L</span><span>O</span><span>G</span>
                    <span>I</span><span>N</span>
                  </div>
                </button>
              )
            }
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={loginDialogOpen} onClose={closeLoginDialog}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle 
            align='center' 
            fontWeight='bold' 
            sx={{ color: '#7c0a02', flexGrow: 1, textAlign: 'center', ml: '15%' }} 
          >
            Login
          </DialogTitle>
          <CloseOutlinedIcon 
            onClick={closeLoginDialog} 
            sx={{ color: '#7c0a02', cursor: 'pointer', mr: "5%" }} 
          />
        </Box>
        <DialogContent sx={{ mb: "8%", textAlign: 'center' }}>
          <Typography variant="body5" gutterBottom>
            Please choose your login type:
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={2}>
            <button className="btn-1" onClick={handleArtisanLogin} style={{ margin: '0 10px' }}>
              <div className="original">Artisan Login</div>
              <div className="letters">
                <span>A</span><span>R</span><span>T</span>
                <span>I</span><span>S</span><span>A</span><span>N</span>
              </div>
            </button>
            <button className="btn-1" onClick={handleCustomerLogin} style={{ margin: '0 10px' }}>
              <div className="original">Customer Login</div>
              <div className="letters">
                <span>C</span><span>U</span><span>S</span>
                <span>T</span><span>O</span><span>M</span><span>E</span><span>R</span>
              </div>
            </button>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ display: 'flex' }}>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, padding: 2 }} role="presentation">
            {
              isAuthenticated ? (
                <>
                  <Button onClick={handleHomeClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Home
                  </Button>
                  <hr />
                  <Button onClick={handleProfileClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Profile
                  </Button>
                  <hr />
                  <Button onClick={handleProductClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Products
                  </Button>
                  <hr />
                  <Button onClick={handleEventsClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Events
                  </Button>
                  <hr />
                  <Button onClick={handleGamesClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Games
                  </Button>
                  <hr />
                  <Button onClick={handleButtonClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Artisan
                  </Button>
                  <hr />
                  <Button onClick={handleAboutCompanyClick} sx={{ color: '#7c0a02' }} fullWidth>
                    About the Company
                  </Button>
                  <hr />
                  <Button onClick={handleHelpClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Contact Us
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleHomeClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Home
                  </Button>
                  <hr />
                  <Button onClick={handleAboutCompanyClick} sx={{ color: '#7c0a02' }} fullWidth>
                    About the Company
                  </Button>
                  <hr />
                  <Button onClick={handleHelpClick} sx={{ color: '#7c0a02' }} fullWidth>
                    Contact Us
                  </Button>
                </>
              )
            }
          </Box>
        </Drawer>

        {/* Add the Image here */}
        
      </Box>

      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
        {children}
      </Box>

      {/* Copyright Section */}
      <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Varanasi. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Privacy Policy | Terms of Service
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;