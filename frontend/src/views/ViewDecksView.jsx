import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { Decks } from '../decks'
import { FormWrapper } from '../utils'

import Stack from '@mui/material/Stack'
import  Typography  from '@mui/material/Typography';

const ViewDecksView = () => {
  const [dataDecks, setDataDekcs] = useState([]);

  const fetchDataDecks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/decks/');
      setDataDekcs(response.data);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchDataDecks();
  }, []);

  console.log(dataDecks)

  return (
    <Stack sx={{ p: 2 }}>
      <FormWrapper title={'Decks'}>
        <Stack rowGap={1}>
          {dataDecks.length > 0 ? (
            dataDecks.map((deck, index) => {
              console.log(deck, index)
              return <Decks title={deck.title} category={deck.category} subcategory={deck.subcategory} language={deck.language} />
              })
          ) : (
            <Typography>
              No se encuentrar decks disponibles
            </Typography>
          )}
        </Stack>
      </FormWrapper>
    </Stack>
  )
}

export default ViewDecksView
