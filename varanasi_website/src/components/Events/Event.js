import React from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';

function Event() {
  const navigate = useNavigate();

  return (
    <>
    <KeyboardBackspaceOutlinedIcon
        variant="contained"
        sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/')}
    />
    <h1>Event</h1>
    </>  
  );
}

export default Event;
