import React from 'react';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './layouts';

const OutletPage = () => {
  return (
    <Stack>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default OutletPage;
