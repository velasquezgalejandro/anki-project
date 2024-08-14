import React from 'react';
import Button from '@mui/material/Button';

const PrincipalButton = ({ label, action = () => {}, extraStyles = {} }) => {
  return (
    <Button
      onClick={action}
      sx={{
        width: 1,
        p: 1,
        bgcolor: 'buttons.primary',
        color: 'text.white',
        ...extraStyles,
        '&:hover': {
          bgcolor: 'buttons.primaryHover',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default PrincipalButton;
