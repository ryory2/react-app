// src/components/Footer.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Typography sx={{ fontSize: '10px' }} variant="body2" color="textSecondary" align="center">
        {'© 歯医者の履歴.com '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
