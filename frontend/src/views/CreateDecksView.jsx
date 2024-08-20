import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Crear Categoria', 'Crear Subcategoria', 'Crear Decks'];

const CreateDecksView = () => {
  const [data, setData] = useState();
  const [activeStep, setActiveStep] = React.useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/');
      setData(response.data); // Guarda los datos en el estado
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <Stack sx={{ p: 2 }}>
      <Card sx={{ height: 1, p: 2, bgcolor: 'red', borderRadius: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>
    </Stack>
  );
};

export default CreateDecksView;
