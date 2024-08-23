import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import {
  FormWrapper,
  GenericTextField,
  GenericAutocomplete,
  StyledButton,
} from '../utils';

const CreateCategoryView = () => {
  const navigate = useNavigate();

  const [selectedLanguage, setLanguage] = useState(null);
  const [title, setTitle] = useState('');

  const handleChangeAutocomplete = (setState, newValue) => {
    setState(newValue);
  };

  const handleChangeTextField = (setState, event) => {
    setState(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        // language: selectedLanguage.code,
      };

      await axios.post('http://localhost:8000/categories/', payload);
      alert('category created successfully!');
      // Aquí puedes limpiar el formulario o redirigir al usuario si es necesario
      setTitle(null);
      setLanguage(null);
      navigate('/create-subcategory');
    } catch (err) {
      console.error('Error creating category:', err);
      alert('Failed to create category. Please try again.');
    }
  };

  return (
    <Stack sx={{ p: 2 }}>
      <FormWrapper title="title">
        <GenericTextField
          label="Title"
          name="title"
          helperText={''}
          value={title}
          onChange={(e) => {
            handleChangeTextField(setTitle, e);
          }}
        />
        <GenericAutocomplete
          label="language"
          name="lenguaje"
          options={[
            { code: 'EN', label: 'English' },
            { code: 'ES', label: 'Spanish' },
          ]}
          getOptionLabel={(option) => option.label}
          helperText={''}
          value={selectedLanguage}
          onChange={(e) => {
            handleChangeAutocomplete(setLanguage, e);
          }}
        />
      </FormWrapper>

      <StyledButton label="Enviar" action={handleSubmit} />
    </Stack>
  );
};

export default CreateCategoryView;
