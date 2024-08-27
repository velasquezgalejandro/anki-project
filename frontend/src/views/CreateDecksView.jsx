import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import {
  FormWrapper,
  GenericTextField,
  GenericAutocomplete,
  StyledButton,
} from '../utils';

const CreateDecksView = () => {
  const navigate = useNavigate();

  const [dataCategory, setDataCategory] = useState();
  const [dataSubcategory, setDataSubcategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedLanguage, setLanguage] = useState(null);
  const [title, setTitle] = useState('');
  const [pdfSelected, setPdfSelected] = useState(null);

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
      setTitle(null)
      setSelectedCategory(null)
      setSelectedSubcategory(null)
      setLanguage(null)
      navigate('/create-cards')
    } catch (err) {
      console.error('Error creating deck:', err);
      alert('Failed to create deck. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfSelected(URL.createObjectURL(file));
    }
  };

  return (
    <Stack sx={{ p: 2 }} rowGap={2}>
      <FormWrapper title="Crea tu Deck o monta un archivo (csv) para crear tu deck">
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
        <GenericAutocomplete
          label="subcategory"
          name="subcategory"
          options={dataSubcategory}
          getOptionLabel={(option) => option.title}
          helperText={''}
          value={selectedSubcategory}
          onChange={(e) => {
            handleChangeAutocomplete(setSelectedSubcategory, e);
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
              <StyledButton label="Enviar" action={handleSubmit} styles={{
        bgcolor:'primary.main',
        color:'white'
      }} />
      </FormWrapper>
    </Stack>
  );
};

export default CreateDecksView;
