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

const CreateCardsView = () => {
  const navigate = useNavigate();

  const [dataDecks, setDataDecks] = useState();
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [command, setCommand] = useState('');

  const fetchDataDecks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/decks/');
      setDataDecks(response.data);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchDataDecks();
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
        deck: selectedDeck.id,
        title,
        question,
        answer,
        command,
      };

      await axios.post('http://localhost:8000/cards/', payload);
      alert('Card created successfully!');
      // Aquí puedes limpiar el formulario o redirigir al usuario si es necesario
      setTitle(null);
      setQuestion(null);
      setAnswer(null);
      setCommand(null);
      // navigate('/create-cards');
    } catch (err) {
      console.error('Error creating deck:', err);
      alert('Failed to create deck. Please try again.');
    }
  };

  return (
    <Stack sx={{ p: 2 }}>
      <FormWrapper title="title">
        <GenericAutocomplete
          label="decks"
          name="decks"
          options={dataDecks}
          getOptionLabel={(option) => option.title}
          helperText={''}
          value={selectedDeck}
          onChange={(e) => handleChangeAutocomplete(setSelectedDeck, e)}
        />
        <GenericTextField
          label="Title"
          name="title"
          helperText={''}
          value={title}
          onChange={(e) => {
            handleChangeTextField(setTitle, e);
          }}
        />
        <GenericTextField
          label="question"
          name="question"
          helperText={''}
          value={question}
          onChange={(e) => {
            handleChangeTextField(setQuestion, e);
          }}
        />
        <GenericTextField
          label="answer"
          name="answer"
          helperText={''}
          value={answer}
          onChange={(e) => {
            handleChangeTextField(setAnswer, e);
          }}
        />
        <GenericTextField
          label="command"
          name="command"
          helperText={''}
          value={command}
          onChange={(e) => {
            handleChangeTextField(setCommand, e);
          }}
        />
      </FormWrapper>

      <StyledButton label="Enviar" action={handleSubmit} />
    </Stack>
  );
};

export default CreateCardsView;
