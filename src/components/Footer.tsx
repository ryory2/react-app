// src/components/Footer.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {'© My App '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
