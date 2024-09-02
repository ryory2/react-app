import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { mediaQuery, useMediaQuery } from '../../hooks/useMediaQuery'

// export const Component = () => {
//   const isSp = useMediaQuery(mediaQuery.sp)

//   if (isSp) {
//     return <SpComponent />
//   }

//   return <PcComponent />
// }
const Logo: React.FC = () => {
    const isSp = useMediaQuery(mediaQuery.sp)
    const siteTitle = "履歴.com"

    if (isSp) {
        return (<Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link component={RouterLink} to="/" variant="body2" sx={{ textDecoration: 'none' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Kosugi Maru', Arial, sans-serif",
                        fontWeight: 'bold',
                        color: '#3f51b5',
                        // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        flexGrow: 1
                    }}
                >
                    {siteTitle}
                </Typography>
            </Link>
        </Box >)
    }

    return (<Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link component={RouterLink} to="/" variant="body2" sx={{ textDecoration: 'none' }}>
            <Typography
                variant="h5"
                sx={{
                    fontFamily: "'Kosugi Maru', Arial, sans-serif",
                    fontWeight: 'bold',
                    color: '#3f51b5',
                    // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                    flexGrow: 1
                }}
            >
                {siteTitle}
            </Typography>
        </Link>
    </Box >)
};

export default Logo;
