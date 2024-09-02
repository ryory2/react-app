import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Link, Container, Box, Typography, FormHelperText } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ mail?: string; password?: string; common?: string }>({});

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/v1/auth/register-validation', { mail, password });
            if (response.status === 204) {
                // const token = response.data.token;
                // JWTトークンを適切に保存（例: localStorage）
                // localStorage.setItem('jwtToken', token);
                // 成功時の画面遷移
                // window.location.href = '/otp-check'; // 適切な成功画面に遷移
                // navigate('/otp-check', { state: { mail } });
                try {
                    const response = await axios.post('/api/v1/otp/send', { mail });
                    if (response.status === 200) {
                        navigate('/otp-check', { state: { mail, password } });
                    }
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status === 400) {
                            // 400エラーの場合、各項目の下にエラーメッセージを表示
                            setErrors(error.response.data.errors);
                        } else {
                            // その他のエラー処理
                            console.error('Unexpected error:', error.response.data);
                        }
                    }
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400 || 409) {
                    // 400エラーの場合、各項目の下にエラーメッセージを表示
                    setErrors(error.response.data.errors);
                } else {
                    // その他のエラー処理
                    console.error('Unexpected error:', error.response.data);
                }
            }
        }
    };

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
                    アカウント登録
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        autoComplete="email"
                        label="メールアドレス"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        error={Boolean(errors.mail || errors.common)}
                        helperText={errors.mail}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        autoComplete="current-password"
                        label="パスワード"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(errors.password || errors.common)}
                        helperText={errors.password}
                    />
                    {errors.common && <FormHelperText error>{errors.common}</FormHelperText>}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                    >
                        登録
                    </Button>
                    <Link component={RouterLink} to="/login" variant="body2">
                        ログインはこちら
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
