import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Typography, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css'; // Import your custom CSS
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      if (loginType === 'artisan') {
        navigate('/artisan');  // Redirect to Artisan page
      } else if (loginType === 'customer') {
        navigate('/customer'); // Redirect to Customer page
      }
      // Reset loginType after navigating
      setLoginType(null);
    }
  }, [isAuthenticated, loginType, navigate]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
    navigate('/profile');
  };

  const handleDashboardClick = () => {
    toggleDrawer();
    navigate('/dashboard');
  };

  const handleArtisanLogin = () => {
    setLoginType('artisan');
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
    <>
      <AppBar position="static" sx={{ backgroundColor: '#ff0038' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginLeft: '10%' }}>
            VARANASI
          </Typography>
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
                  <div className="original">Login</div>
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
        <DialogContent sx={{ mb: "8%", textAlign: 'center'}}>
          <Typography variant="body5"  gutterBottom>
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

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }} role="presentation">
          {
            isAuthenticated ? (
              <>
                <Button onClick={handleHomeClick} sx={{ color: '#7c0a02'}} fullWidth>
                  Home
                </Button>
                <hr />
                <Button onClick={handleProfileClick} sx={{ color: '#7c0a02'}} fullWidth>
                  Profile
                </Button>
                <hr />
                <Button onClick={handleDashboardClick} sx={{ color: '#7c0a02'}} fullWidth>
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleHomeClick} sx={{ color: '#7c0a02'}} fullWidth>
                  Home
                </Button>
                <hr />
                <Button onClick={handleAboutCompanyClick} sx={{ color: '#7c0a02'}} fullWidth>
                  About the Company
                </Button>
                <hr />
                <Button onClick={handleHelpClick} sx={{ color: '#7c0a02'}} fullWidth>
                  Contact Us
                </Button>
              </>
            )
          }
        </Box>
      </Drawer>

      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
        {children}
      </Box>
      
    </>
  );
}

export default Layout;