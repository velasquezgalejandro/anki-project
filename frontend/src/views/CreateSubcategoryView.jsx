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
  const [dataSubcategory, setDataSubcategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedLanguage, setLanguage] = useState(null);
  const [title, setTitle] = useState('');

  const fetchDataCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/');
      setDataCategory(response.data);
    } catch (err) {
      console.log({ err });
    }
  };

  const fetchDataSubCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/subcategories/');
      setDataSubcategory(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDataCategory();
    fetchDataSubCategory();
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
        subcategory: selectedSubcategory.id,
        language: selectedLanguage.code,
      };

      await axios.post('http://localhost:8000/decks/', payload);
      alert('Deck created successfully!');
      // Aquí puedes limpiar el formulario o redirigir al usuario si es necesario
      setTitle(null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setLanguage(null);
      navigate('/create-cards');
    } catch (err) {
      console.error('Error creating deck:', err);
      alert('Failed to create deck. Please try again.');
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
      </FormWrapper>

      <StyledButton label="Enviar" action={handleSubmit} />
    </Stack>
  );
};

export default CreateSubcategoryView;
