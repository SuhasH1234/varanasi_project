import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AboutCompany from './AboutCompany';
import ContactUs from './ContactUs';
import Home from './Home';
import Artisan from '../components/Artisan/Artisan';
import VCustomer from './Customer/VCustomer';
import Product from './Products/Product';
import Event from './Events/Event';
import WatchlistPage from './Products/WatchlistPage';
import CartPage from './Products/CartPage';
import ProfilePage from './Profile/ProfilePage';
import Games from './Games';

function AppWrapper() {
  const [watchlist, setWatchlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Add product to watchlist
  const addToWatchlist = (product) => {
    setWatchlist([...watchlist, product]);
  };

  // Remove product from watchlist by index
  const removeFromWatchlist = (index) => {
    const updatedWatchlist = watchlist.filter((_, i) => i !== index);
    setWatchlist(updatedWatchlist);
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove product from cart by index
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutCompany />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/artisan" element={<Artisan />} />
          <Route path="/customer" element={<VCustomer />} />
          <Route path="/event" element={<Event />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game" element={<Games />} />
          <Route
            path="/product"
            element={
              <Product
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/event" element={<Event />} />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppWrapper;