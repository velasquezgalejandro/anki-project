import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import {
  FormWrapper,
  GenericTextField,
  GenericAutocomplete,
  StyledButton,
} from '../utils';

const CreateCardsView = () => {
  const [dataDecks, setDataDecks] = useState();
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [command, setCommand] = useState('');
  const [pdfSelected, setPdfSelected] = useState(null);


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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/epub+zip') {
       console.log({file})
        setPdfSelected(file);
      } else {
        alert('Please select a valid EPUB file.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const payload =  {
        deck: selectedDeck.id,
        title,
        question,
        answer,
        command,
      };

      await axios.post(`http://localhost:8000/cards/`, payload);
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

 const handleSubmitEpub = async (e) => {
        e.preventDefault();

        if (!pdfSelected) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('epub', pdfSelected);

        try {
            const response = await axios.post('http://localhost:8000/upload/', formData, {
        method: 'POST',
        body: formData,
      });
            alert('create cards.');
        } catch (error) {
            console.error('Upload error:', error.response ? error.response.data : error.message);
            alert('Failed to create deck. Please try again.');
        }
  };

  return (
    <Stack rowGap={2} sx={{ p: 2 }} >
      <FormWrapper title="Crea tus cards o monta un archivo (epub)">
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
      <StyledButton label="Enviar" action={handleSubmit} styles={{
        bgcolor:'primary.main',
        color:'white'
      }} />
      </FormWrapper>

    <Box sx={{
      position: 'relative',
      border: '4px solid #d0d7de',
      minHeight: 100,
      marginLeft: '10px',
      marginRight: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: 'transparent',
        border: '4px dashed #d0d7de'
      }
    }}>
      <input
        type="file"
        accept="application/epub+zip"
        onChange={handleFileChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer'
        }}
      />
      <div className="text-information"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}
      >
        <h3>Drag and drop a file (EPUB)   </h3>
      </div>
    </Box>
      {pdfSelected && (
      <div>
        <p>EPUB File Selected:</p>
        <a href={pdfSelected} download="selected.epub">Download EPUB</a>
      </div>
    )}
      {pdfSelected &&
        <StyledButton label="Enviar" action={handleSubmitEpub} styles={{
          bgcolor: 'primary.main',
          color: 'white'
        }} />
      }
    </Stack>
  );
};

export default CreateCardsView;
