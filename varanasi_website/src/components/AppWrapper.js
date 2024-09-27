import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AboutCompany from './AboutCompany';
import ContactUs from './ContactUs';
import Home from './Home';
import Artisan from '../components/Artisan/Artisan';
import VCustomer from './Customer/VCustomer';

function AppWrapper() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutCompany />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/artisan" element={<Artisan />} />
            <Route path="/customer" element={<VCustomer />} />
          </Routes>
        </Layout>
      </Router>
    );
  }

export default AppWrapper;
