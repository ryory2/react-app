import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Link, Container, Box, Typography, FormHelperText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ mail?: string; password?: string; common?: string }>({});
    // 書式：const [＜状態変数の名前＞, ＜状態変数を更新するための関数＞] = useState<＜状態変数の型＞>(＜初期値＞);
    // 「{ mail?: string; password?: string }」・・・本来はString等の型を指定するが、今回はerrorsの型を「オブジェクト」として定義と指定を一緒に行っている。
    // 「?」・・・TypeScript の構文で、プロパティがオプショナル（省略可能）であることを示す。
    // この場合、mail、passwordがなくともエラーにならない。
    // Partial<{ mail: string; password: string; common: string }>のように書くことも可能

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', { mail, password });
            if (response.status === 200) {
                const token = response.data.token;
                // JWTトークンを適切に保存（例: localStorage）
                localStorage.setItem('jwtToken', token);
                // 成功時の画面遷移
                window.location.href = '/home'; // 適切な成功画面に遷移
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    // 400エラーの場合、各項目の下にエラーメッセージを表示
                    setErrors(error.response.data.errors);
                } if (error.response.status === 401) {
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
                    ログイン
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        //todo 必須時の「*」を「(必須)」とかにしたい→できない
                        required
                        fullWidth
                        id="mail"
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
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(errors.password || errors.common)}
                        // 「error」・・・Material-UIの <TextField> コンポーネントがエラー状態であるかどうかを示すために利用
                        // エラー状態になると、フィールドの外観が変わり、例えば赤色の枠線やエラーメッセージが表示
                        // error=＜真偽値＞で利用
                        // 「Boolean(errors.password)」・・・「ブール変換」undefined や null、空文字列 ("") などの「偽」 (falsy) の値の場合false
                        // console.log(Boolean(""));          // false
                        // console.log(Boolean("hello"));     // true
                        // console.log(Boolean(0));           // false
                        // console.log(Boolean(1));           // true
                        // console.log(Boolean(undefined));   // false
                        // console.log(Boolean(null));        // false
                        // console.log(Boolean({}));          // true
                        // console.log(Boolean([]));          // true
                        helperText={errors.password}
                    />
                    {/* 「errors.common に値が存在する場合、その値を <FormHelperText> コンポーネント内に表示する」 */}
                    {errors.common && <FormHelperText error>{errors.common}</FormHelperText>}
                    {/* 「{}」・・・ 条件付きレンダリングと呼ばれ、{}内に書かれた部分は、JSX内でJavaScriptコードを埋め込むためのもの */}
                    {/* この場合、errors.role が真 (truthy) である場合に <FormHelperText> コンポーネントがレンダリングされ、errors.role が偽 (falsy) の場合には何もレンダリングされません。 */}
                    {/* 「条件演算子 (&&)」・・・ 短絡評価 (short-circuit evaluation) と呼ばれる方法で使用される。左側の式が真 (truthy) である場合にのみ右側の式が評価される。右が真の場合のみレンダリングされる*/}
                    {/* 「<FormHelperText>」 はMaterial-UIのコンポーネントで、フォームの補助テキスト（通常はエラーメッセージや説明）を表示するために使用されます。このコンポーネントの中に errors.role の値を挿入することで、該当するエラーメッセージをユーザーに表示します。 */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
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
