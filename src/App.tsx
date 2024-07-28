// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LinkListTop from './pages/LinkListTop';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from './components/AuthProvider';
import AuthGuard from './components/AuthGuard';

const App: React.FC = () => {
    return (
        <AuthProvider>
            {/* 役割：AuthProviderでアプリケーション全体をラップし、認証状態を提供 */}
            <Router>
                {/* 役割：Routerでルーティングを設定 */}
                <CssBaseline />
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <Header />
                    <Box component="main" flexGrow={1}>
                        <Routes>
                            <Route path="/" element={<LinkListTop />} />
                            {/* <Route path="/login" element={<Login />} /> */}
                            <Route path="/login" element={<Login />} />
                            {/* 役割：ログインページへのルートを定義 */}
                            <Route path="/Register" element={<Register />} />
                            {/* <Route path="/otp-verification" element={<OtpVerification />} />
                            <Route path="/register" element={<Register />} /> */}
                            <Route
                                path="/home"
                                element={ // このパスに対応するコンポーネントを指定
                                    <AuthGuard> {/* AuthGuardコンポーネントで認証を確認 */}
                                        <Home /> {/* 認証が必要なホームページのルート設定 */}
                                    </AuthGuard>
                                    // AuthGuardコンポーネントがマウントされると、useEffectフックが実行されます。
                                    // useEffect内で、ローカルストレージからJWTトークンを取得し、それをサーバーに送信して検証します。
                                    // 検証が成功した場合（トークンが有効である場合）、AuthGuardコンポーネントはchildrenプロパティとして渡された子コンポーネント（HomePage）をレンダリングします。
                                    // 検証が失敗した場合、またはエラーが発生した場合、ユーザーはログインページにリダイレクトされます。
                                } />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </AuthProvider>
    );
};

export default App;
