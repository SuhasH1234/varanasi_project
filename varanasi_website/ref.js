import React, { useState, useEffect } from 'react';
import { Box, IconButton, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import p1 from '../../assessts/v1.jpg';
import p2 from '../../assessts/p2.jpg';

function Product({ addToWatchlist, removeFromWatchlist, addToCart, removeFromCart, watchlist = [], cart = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToWatchlist, setAddedToWatchlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentlySpokenProduct, setCurrentlySpokenProduct] = useState(null);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [appliedCategoryFilter, setAppliedCategoryFilter] = useState('');
  const [appliedPriceFilter, setAppliedPriceFilter] = useState('');

  const categories = [
    "Saree", "Stone Carvings", "Gulabi Minakari", "Glass Beads", "Rudraksha Mala",
    "Wooden Toys", "Flute", "Indian Literature Books", "Hand Knotted Carpets", "Bangles"
  ];

  const products = [
    {
      name: "Varanasi Soft Stone Nataraja (4 Inches)",
      material: "Soft Stone",
      usability: "Showpiece/Gift Item",
      weight: "120-150 grams",
      dimensions: "LxWxH : 3*5*4 Inches",
      process: "Handcrafted",
      price: "543",
      category: "Stone Carvings",
      image: p1,
    },
    {
      name: "Varanasi Soft Stone Jali Trunk Up Elephant (2.5 Inches) – Set of 2",
      material: "Soft Stone",
      usability: "Showpiece/Gift Item",
      weight: "110-125 gms/pcs",
      dimensions: "LxWxH : 8×3.5×7 Cm",
      process: "Handcrafted",
      price: "624",
      category: "Stone Carvings",
      image: p2,
    }
  ];

  useEffect(() => {
    const watchlistStatus = {};
    const cartStatus = {};
    
    products.forEach(product => {
      watchlistStatus[product.name] = watchlist.includes(product.name);
      cartStatus[product.name] = cart.includes(product.name);
    });

    setAddedToWatchlist(watchlistStatus);
    setAddedToCart(cartStatus);
  }, [watchlist, cart, products]);

  const handleAddToWatchlist = (productName) => {
    if (addedToWatchlist[productName]) {
      removeFromWatchlist(productName);
      setAddedToWatchlist((prev) => ({ ...prev, [productName]: false }));
      setNotificationMessage(`${productName} removed from watchlist.`);
    } else {
      addToWatchlist(productName);
      setAddedToWatchlist((prev) => ({ ...prev, [productName]: true }));
      setNotificationMessage(`${productName} added to watchlist.`);
    }
    setOpenSnackbar(true);
  };

  const handleAddToCart = (productName) => {
    if (addedToCart[productName]) {
      removeFromCart(productName);
      setAddedToCart((prev) => ({ ...prev, [productName]: false }));
      setNotificationMessage(`${productName} removed from cart.`);
    } else {
      addToCart(productName);
      setAddedToCart((prev) => ({ ...prev, [productName]: true }));
      setNotificationMessage(`${productName} added to cart.`);
    }
    setOpenSnackbar(true);
  };

  const handleViewWatchlist = () => {
    navigate('/watchlist');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  const toggleDialog = () => setOpenDialog(!openDialog);

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const applyFilters = () => {
    setAppliedCategoryFilter(categoryFilter);
    setAppliedPriceFilter(priceFilter);
    toggleDialog();
  };

  const filteredProducts = products
    .filter(product => 
      (!appliedCategoryFilter || product.category === appliedCategoryFilter) && // Apply the selected category filter
      (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (appliedPriceFilter === "lowToHigh") return a.price - b.price;
      if (appliedPriceFilter === "highToLow") return b.price - a.price;
      return 0;
    });

  const handleReadDetails = (product) => {
    if (currentlySpokenProduct === product.name) {
      window.speechSynthesis.cancel();
      setCurrentlySpokenProduct(null);
    } else {
      setCurrentlySpokenProduct(product.name);
      const details = `
        Product Name: ${product.name}.
        Category: ${product.category}.
        Material: ${product.material}.  
        Weight: ${product.weight}. 
        Dimensions: ${product.dimensions}.
        Usability: ${product.usability}.
        Process: ${product.process}. 
        Price: ${product.price}.
      `;

      const speech = new SpeechSynthesisUtterance(details);
      window.speechSynthesis.speak(speech);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <KeyboardBackspaceOutlinedIcon
          variant="contained"
          sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
          onClick={() => navigate('/')}
      />
      <div>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <h1 style={{ textAlign: 'center', marginLeft: '45%', color: "#062a78" }}>Varanasi Products</h1>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="flex-end" alignItems="center">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>

            <IconButton onClick={toggleDialog}>
              <FilterListIcon />
            </IconButton>

            <Dialog open={openDialog} onClose={toggleDialog} maxWidth="sm">
              <DialogTitle sx={{ mb: '2%' }}>Filter Products</DialogTitle>
              <DialogContent>
                <FormControl fullWidth sx={{ marginBottom: '25px', mt: '5px' }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Price</InputLabel>
                  <Select
                    value={priceFilter}
                    onChange={handlePriceChange}
                    label="Price"
                  >
                    <MenuItem value="lowToHigh">Low to High</MenuItem>
                    <MenuItem value="highToLow">High to Low</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleDialog}>Cancel</Button>
                <Button onClick={applyFilters}>Apply</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ textAlign: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Price: ₹{product.price}</Typography>
                <IconButton
                  color={addedToWatchlist[product.name] ? "secondary" : "default"}
                  onClick={() => handleAddToWatchlist(product.name)}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
                <IconButton
                  color={addedToCart[product.name] ? "secondary" : "default"}
                  onClick={() => handleAddToCart(product.name)}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleReadDetails(product)}>
                  <VolumeUpOutlinedIcon />
                </IconButton>
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No products found</Typography>
          )}
        </Grid>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {notificationMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Product;
