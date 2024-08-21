import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import { FormWrapper, GenericTextField, GenericAutocomplete } from '../utils';

const CreateDecksView = () => {
  const [dataCategory, setDataCategory] = useState();
  const [dataSubcategory, setDataSubcategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
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
    } catch (err) {
      console.log({ err });
    }
  };


  useEffect(() => {
    fetchDataCategory();
    fetchDataSubCategory();
  }, []);

  // console.log({ dataCategory });
  // console.log({ dataSubcategory });

  const handleChangeAutocomplete = (setState, newValue) => {
    setState(newValue);
  };

  const handleChangeTextField = (setState, event) => {
    setState(event.target.value);
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
          helperText={''}
          value={selectedCategory}
          onChange={(e) => handleChangeAutocomplete(setSelectedCategory, e)}
        />
        <GenericAutocomplete
          label="subcategory"
          name="subcategory"
          options={dataSubcategory}
          helperText={''}
          value={selectedSubcategory}
          onChange={(e) => {
            handleChangeAutocomplete(setSelectedSubcategory, e);
          }}
        />
        <GenericTextField
          label="language"
          name="lenguaje"
          helperText={''}
          value={''}
          onChange={(e) => {
            handleChangeTextField(setLanguage, e);
          }}
        />
      </FormWrapper>
    </Stack>
  );
};

export default CreateDecksView;
