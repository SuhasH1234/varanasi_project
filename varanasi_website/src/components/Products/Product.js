import React, { useState, useEffect } from 'react'; 
import { Box, IconButton, Badge, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
  const [currentlySpokenProduct, setCurrentlySpokenProduct] = useState(null); // State to track the currently spoken product
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  // New states for filters
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const [appliedCategoryFilter, setAppliedCategoryFilter] = useState('');
  const [appliedPriceFilter, setAppliedPriceFilter] = useState('');
  
  const categories = [
    "Saree", "Stone Carvings", "Gulabi Minakari", "Glass Beads", "Rudraksha Mala",
    "Wooden Toys", "Flute", "Indian Literature Books", "Hand Knotted Carpets", "Bangles"
  ];

  // Sample product data
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

  // Effect to synchronize the addedToWatchlist and addedToCart state
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

  const toggleDialog = () => setOpenDialog(!openDialog); // Toggle dialog open/close

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

  // Filter products based on category and price
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

  // Function to read product details or stop reading
  const handleReadDetails = (product) => {
    if (currentlySpokenProduct === product.name) {
      window.speechSynthesis.cancel(); // Stop speaking if the same product is clicked again
      setCurrentlySpokenProduct(null); // Reset the currently spoken product
    } else {
      // Set the new currently spoken product
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

  // Snackbar close handler
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

          {/* Filter List Icon */}
          <IconButton onClick={toggleDialog}>
            <FilterListIcon />
          </IconButton>

          {/* Filter Dialog */}
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

          <button
            className='btn-1'
            variant="contained"
            color="secondary"
            onClick={handleViewWatchlist}
            style={{ marginLeft: '10px' }}>
            <div className="original">WATCHLIST</div>
            <div className="letters">
              <span>W</span><span>A</span><span>T</span><span>C</span><span>H</span>
              <span>L</span><span>I</span><span>S</span><span>T</span>
            </div>
          </button>
          <button
            className='btn-1'
            variant="contained"
            color="primary"
            onClick={handleViewCart}
            style={{ marginLeft: '10px' }}>
            <div className="original">CART</div>
            <div className="letters">
              <span>C</span><span>A</span>
              <span>R</span><span>T</span>
            </div>
          </button>
        </Grid>
      </Grid>

      {/* Render filtered products */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '25%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '0.5px solid black',
                marginRight: '20px',
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: '10px 0', fontWeight: 'bold', color: "#a30000" }}>{product.name}</Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Category: <span style={{ fontWeight: 'normal' }}>{product.category}</span></Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Material: <span style={{ fontWeight: 'normal' }}>{product.material}</span></Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Weight: <span style={{ fontWeight: 'normal' }}>{product.weight}</span></Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Dimensions: <span style={{ fontWeight: 'normal' }}>{product.dimensions}</span></Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Usability: <span style={{ fontWeight: 'normal' }}>{product.usability}</span></Typography>
              <Typography variant="body2" sx={{ margin: '10px 0', fontWeight: 'bold' }}>Process: <span style={{ fontWeight: 'normal' }}>{product.process}</span></Typography>
              
              <Typography variant="h6" color="primary" sx={{ margin: '10px 0', fontWeight: 'bold' }}>₹ {product.price} /-</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={() => handleReadDetails(product)}>
                <VolumeUpOutlinedIcon color={currentlySpokenProduct === product.name ? 'primary' : 'inherit'} />
              </IconButton>
              <IconButton onClick={() => handleAddToWatchlist(product.name)}>
                <Badge badgeContent={addedToWatchlist[product.name] ? 1 : 0} color="secondary">
                  <FavoriteBorderOutlinedIcon color={addedToWatchlist[product.name] ? 'secondary' : 'inherit'} />
                </Badge>
              </IconButton>
              <IconButton onClick={() => handleAddToCart(product.name)}>
                <Badge badgeContent={addedToCart[product.name] ? 1 : 0} color="primary">
                  <ShoppingCartOutlinedIcon color={addedToCart[product.name] ? 'primary' : 'inherit'} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>No products found.</Typography>
      )}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        sx={{ mt: '13%'}}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%'}}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
}

export default Product;