// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Box, Grid, Link, List, ListItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LinkListTop: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1">
          Welcome to the home page!
        </Typography>
      </Box>
      <Box>
        <List>
          <ListItem>
            <Link component={RouterLink} to="/register" variant="body2">
              アカウント登録はこちら
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/login" variant="body2">
              ログインはこちら
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/home" variant="body2">
              トップ画面はこちら
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/color" variant="body2">
              カラーページ
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/otp-check" variant="body2">
              ワンタイムパスワード入力画面
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LinkListTop;
