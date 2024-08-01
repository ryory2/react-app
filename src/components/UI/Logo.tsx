import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Logo: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link component={RouterLink} to="/" variant="body2" sx={{ textDecoration: 'none' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Kosugi Maru', Arial, sans-serif",
                        fontWeight: 'bold',
                        color: '#E50914',
                        // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        flexGrow: 1
                    }}
                >
                    歯医者の履歴.com
                </Typography>
            </Link>
        </Box >
    );
};

export default Logo;
