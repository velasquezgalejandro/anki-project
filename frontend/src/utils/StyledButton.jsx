import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ label, action = () => {}, styles = {} }) => {
  return (
    <Button
      onClick={action}
      sx={{
        width: 1,
        p: 1,
        '&:hover': {
          bgcolor: 'buttons.secondaryHover',
        },
        ...styles,
      }}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
