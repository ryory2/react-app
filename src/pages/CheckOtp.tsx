import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Link, Container, Box, Typography, FormHelperText } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const CheckOtp: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [maskedMail, setMaskedMail] = useState('');
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<{ code?: string; mail?: string; password?: string; common?: string; }>({});

    useEffect(() => {
        var mail = location.state?.mail || ''; // 状態が存在しない場合に空文字列を設定
        const [localPart, domain] = mail.split('@');
        if (!localPart || localPart.length <= 2) {
            return mail; // ローカルパートが2文字以下の場合はそのまま
        }
        const maskedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
        setMaskedMail(`${maskedLocalPart}@${domain}`);
        setMail(mail);
    }, []); // 空の依存配列により、マウント時のみ実行される

    useEffect(() => {
        var password = location.state?.password || ''; // 状態が存在しない場合に空文字列を設定
        setPassword(password);
    }, []); // 空の依存配列により、マウント時のみ実行される

    const handleCheckOpt = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/otp/check-otp', { mail, code });
            if (response.status === 200) {
                try {
                    const response = await axios.post('http://localhost:8080/api/v1/auth/register', { mail, password });
                    if (response.status === 200) {
                        const token = response.data.token;
                        // JWTトークンを適切に保存（例: localStorage）
                        localStorage.setItem('jwtToken', token);
                        // 成功時の画面遷移
                        window.location.href = '/home'; // 適切な成功画面に遷移
                        // navigate('/otp-check', { state: { mail } });
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
                if (error.response.status === 400) {
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
                    alignItems: 'left',
                }}
            >
                <Typography component="h1" variant="body2">
                    {maskedMail}宛に認証コードを送信しました。
                </Typography>
                <Typography component="h1" variant="body2">
                    メールでお送りした認証コードを以下に入力してください。
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        autoComplete="email"
                        label="認証コード"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        error={Boolean(errors.code || errors.common)}
                        helperText={errors.code}
                    />
                    {errors.common && <FormHelperText error>{errors.common}</FormHelperText>}
                    {errors.mail && <FormHelperText error>{errors.mail}</FormHelperText>}
                    {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleCheckOpt}
                    >
                        送信
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CheckOtp;
