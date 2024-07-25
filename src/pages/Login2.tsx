import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const Register2: React.FC = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ mail?: string; password?: string }>({});

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { mail, password });
      if (response.status === 200) {
        const token = response.data.token;
        // JWTトークンを適切に保存（例: localStorage）
        localStorage.setItem('jwtToken', token);
        // 成功時の画面遷移
        window.location.href = '/success'; // 適切な成功画面に遷移
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        error={Boolean(errors.mail)}
        helperText={errors.mail}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register2;
