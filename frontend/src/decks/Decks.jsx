import React from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';

axios
  .get('https://localhost:8000/decks')
  .then((response) => {
    console.log(response.data);
    // Display fetched data
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

const Decks = () => {
  return <Stack sx={{ width: 1, height: 1 }}>Decks</Stack>;
};

export default Decks;
