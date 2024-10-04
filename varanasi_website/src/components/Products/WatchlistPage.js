import React from 'react';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';

function WatchlistPage({ watchlist, removeFromWatchlist }) {
  const navigate = useNavigate();

  const handleReturnToCartPage = () => {
    navigate('/cart');
  };

  return (
    <>
    <KeyboardBackspaceOutlinedIcon
        variant="contained"
        sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/product')}
    />
    <div>
      <h1>Watchlist</h1>
      {watchlist.length === 0 ? (
        <h2>Your watchlist is empty</h2>
      ) : (
        <List>
          {watchlist.map((product, index) => (
            <ListItem key={index}>
              <ListItemText primary={product} />
              <IconButton onClick={() => removeFromWatchlist(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
  <button className="btn-1" onClick={handleReturnToCartPage} style={{ margin: '10px' }}>
    <div className="original">Continue</div>
    <div className="letters">
      <span>C</span><span>O</span><span>N</span><span>T</span>
      <span>I</span><span>N</span><span>U</span><span>E</span>
    </div>
  </button>
</div>

    </div>
    </>
  );
}

export default WatchlistPage;
