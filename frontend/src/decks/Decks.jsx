import React from 'react';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';



const Decks = ({title, category, subcategory,language}) => {
  return <Stack sx={{ width: 1, height: 1 }}>      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          { title } - {category} - {language}
        </AccordionSummary>
        <AccordionDetails>
          Detalles
        </AccordionDetails>
      </Accordion></Stack>;
};

export default Decks;
