import React from 'react';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const FormWrapper = ({ title, children }) => {
  return (
    <Card sx={{ height: 1, p: 2, borderRadius: 2 }}>
      <Stack sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Divider />
      </Stack>
      {children}
    </Card>
  );
};

export default FormWrapper;
