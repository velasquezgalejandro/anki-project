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

const CreateSubcategoryView = () => {
  const navigate = useNavigate();

  const [dataCategory, setDataCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('');

  const fetchDataCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/');
      setDataCategory(response.data);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

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
        category: selectedCategory.id,
      };

      await axios.post('http://localhost:8000/subcategories/', payload);
      alert('Subcategory created successfully!');
      // Aquí puedes limpiar el formulario o redirigir al usuario si es necesario
      setTitle(null);
      setSelectedCategory(null);
      navigate('/create-decks');
    } catch (err) {
      console.error('Error creating subcategory:', err);
      alert('Failed to create subcategory. Please try again.');
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
          label="category"
          name="category"
          options={dataCategory}
          getOptionLabel={(option) => option.title}
          helperText={''}
          value={selectedCategory}
          onChange={(e) => handleChangeAutocomplete(setSelectedCategory, e)}
        />
      </FormWrapper>

      <StyledButton label="Enviar" action={handleSubmit} />
    </Stack>
  );
};

export default CreateSubcategoryView;
