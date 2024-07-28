import React from 'react';
import { Button, TextField, Link, Container, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    ログイン
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        ログイン
                    </Button>
                    <Link component={RouterLink} to="/register" variant="body2">
                        アカウント登録はこちら
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
