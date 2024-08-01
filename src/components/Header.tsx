import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from '../components/UI/LogoutButton';
import useAuth from '../hooks/useAuth';
import Logo from './UI/Logo';
import styled from '@emotion/styled';

const WhiteAppBar = styled(AppBar)({
  backgroundColor: '#f8f8f8', // 背景色を白に設定
  color: '#000000', // テキストやアイコンの色を黒に設定（必要に応じて変更）
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // シャドウの設定
});

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    //バーの色を変えたい

    <Box sx={{ flexGrow: 1 }}>
      <WhiteAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            デンタル履歴.com
          </Typography> */}
          <Logo />
          {isAuthenticated && (
            <LogoutButton />
          )}
        </Toolbar>
      </WhiteAppBar>
    </Box>
  );
}
export default Header;