import React from 'react';
import { Button, Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

function AboutCompany() {
  const navigate = useNavigate();

  return (
    <>
      <KeyboardBackspaceOutlinedIcon
        variant="contained"
        sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
      <Box 
        sx={{
          padding: { xs: 1, sm: 3, md: 5 },
          textAlign: 'center',
          backgroundColor: '#fffafa',
          color: '#333',
          minHeight: '100vh',
        }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: '#7c0a02' }}
        >
          About Human Welfare Association - Varanasi Smart Communication Software
        </Typography>

        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ fontStyle: 'italic', marginBottom: 3 }}
        >
          <strong>
          Empowering Artisans, Elevating Traditions.
          </strong>
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 3, maxWidth: 'auto', margin: 'auto' }}
        >
          <Typography variant="body1" paragraph>
            The <strong>Human Welfare Association (HWA)</strong> is a nonprofit organization based in Varanasi, India, 
            dedicated to the empowerment and upliftment of artisans working in the textiles and handicraft sectors. 
            Our focus lies in bridging the gap between local artisans and global markets by providing them with a platform 
            to showcase their talent, sell their products, and organize local events that promote mutual collaboration.
          </Typography>

          <Typography variant="body1" paragraph>
            At <strong>HWA</strong>, we believe these artisans are no less than artists, and they deserve the opportunity to shine on the global stage.
          </Typography>

          {/* Our Mission and Our Vision Table */}
          <TableContainer component={Paper} sx={{ marginTop: 4, backgroundColor: '#ff0038' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#7c0a02', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center'  }}>Our Mission</TableCell>
                  <TableCell sx={{ backgroundColor: '#7c0a02', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>Our Vision</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: 'black', backgroundColor: 'white' }}><strong>
                    To create a digital space where artisans from ethnic India, particularly Varanasi, can register, showcase, 
                    and sell their handcrafted textiles and products to a broader audience. By doing so, we aim to preserve India’s 
                    rich cultural heritage while promoting economic growth in rural areas.</strong>
                  </TableCell>
                  <TableCell sx={{ color: 'black', backgroundColor: 'white' }}><strong>
                    To ensure every artisan, regardless of their background, is given a fair chance to grow their business and gain recognition 
                    through access to e-commerce, event organization, and real-time analytics that allow them to compete in today’s digital world.</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Our Platform Table */}
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} sx={{ backgroundColor: '#7c0a02', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                    Our Platform
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Artisan Registration and Profile Creation:</strong> Artisans can easily register and upload product images.</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Product Listings and E-Commerce:</strong> Consumers can browse and purchase items securely.</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Self-Organized Events:</strong> Artisans can create and manage local events.</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Analytics and Performance Metrics:</strong> Insightful statistics for artisans.</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Authenticity Assurance:</strong> Ensuring artisan authenticity through payment options like COD.</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1"><strong>Recognition and Motivation:</strong> “Artisan of the Month” for recognition.</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default AboutCompany;
