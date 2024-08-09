import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Section = ({ title, children }) => {
  return (
    <Stack
      rowGap={2}
      sx={{
        height: '100%',
        width: 0.5,
        p: 2,
      }}
    >
      <Typography
        align="center"
        variant="h6"
        sx={{ color: 'text.lightBlue', fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

const Footer = () => {
  const renderLink = (texto, link = '#') => {
    return (
      <Link
        underline="hover"
        target={'blank'}
        href={link}
        variant="body1"
        sx={{ color: 'text.white' }}
      >
        {texto}
      </Link>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        bgcolor: 'layout.main',
        py: 2,
        justifyContent: 'space-around',
      }}
    >
      <Section title={'primera sección'}>
        <Stack>
          {renderLink('enlace 1')}
          {renderLink('enlace 2')}
          {renderLink('enlace 3')}
        </Stack>
      </Section>
      <Divider
        orientation="vertical"
        sx={{ bgcolor: 'white', height: '200px' }}
      />
      <Section title={'segunda sección'}>
        <Stack>
          {renderLink('enlace 1')}
          {renderLink('enlace 2')}
          {renderLink('enlace 3')}
        </Stack>
      </Section>
    </Box>
  );
};

export default Footer;
