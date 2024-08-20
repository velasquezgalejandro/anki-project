import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../utils';

const cssButtons = {
  bgcolor: 'buttons.secondary',
  color: 'text.white',
  maxWidth: 200,
};

const HomeView = () => {
  const navigate = useNavigate();
  const renderNavigate = (link) => () => {
    navigate(link);
  };

  return (
    <Stack sx={{ mb: 2 }}>
      <Box>
        <Grid
          container
          sx={{
            background:
              'linear-gradient(76deg, rgba(5,7,25,1)  21%, rgba(8,11,39,1) 42%,  rgba(6,13,87,1) 88%, rgba(61,108,180,1) 100%)',
            p: 2,
          }}
        >
          <Grid xs={6}>
            <Stack>
              <Typography variant="h6" sx={{ color: 'white' }}>
                TITULO
              </Typography>
              <Typography sx={{ color: 'white' }}>Descripcion</Typography>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Box
              component="img"
              src={''}
              sx={{ width: 1, height: 'auto', aspectRatio: '16/9' }}
            />
          </Grid>
        </Grid>
      </Box>
      <Stack sx={{ minHeight: 500 }}>
        <Grid container>
          <Grid xs={6}>beneficios</Grid>
          <Grid xs={6}>usos</Grid>
        </Grid>
      </Stack>
      <Stack alignItems="center" rowGap={1} sx={{ width: 1 }}>
        <Typography>Accesos</Typography>
        <Stack
          direction="row"
          justifyContent={'space-around'}
          sx={{ width: 1 }}
        >
          <StyledButton
            label={'Descargar Decks'}
            action={renderNavigate('/create-decks')}
            styles={cssButtons}
          />
          <StyledButton
            label={'Crear Decks'}
            action={renderNavigate('/create-decks')}
            styles={cssButtons}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeView;
