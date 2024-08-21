import React from 'react';
import TextField from '@mui/material/TextField';

const GenericTextField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      helperText={helperText}
      fullWidth
      variant="outlined"
      margin="normal"
      {...props} // Permite pasar otras props no explícitas
    />
  );
};

export default GenericTextField;
