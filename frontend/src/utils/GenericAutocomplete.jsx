import React from 'react';
import { Autocomplete } from '@mui/material';
import GenericTextField from './GenericTextField';

const GenericAutocomplete = ({
  options = [],
  getOptionLabel = '',
  value,
  onChange,
  label,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <GenericTextField {...params} label={label} {...props} />
      )}
    />
  );
};

export default GenericAutocomplete;
