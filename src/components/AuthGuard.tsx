import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 環境変数からAPIのベースURLを設定
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const navigate = useNavigate(); // ルーティングのためのフックをインポート
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // 関数の定義
        const verifyToken = async () => {
            const token = localStorage.getItem('jwtToken'); // ローカルストレージからJWTトークンを取得

            if (!token) {
                navigate('/login'); // トークンが存在しない場合、ログイン画面に遷移
                return;
            }

            try {
                console.log("アクセス開始:")
                const response = await axios.post('http://localhost:8080/api/v1/auth/jwt', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 204) {
                    setIsAuthenticated(true); // 認証がOKの場合、認証状態をtrueに設定
                } else {
                    navigate('/login'); // 認証がNGの場合、ログイン画面に遷移
                }
            } catch (error) {
                navigate('/login'); // エラーが発生した場合もログイン画面に遷移
            }
        };

        //関数の実行
        verifyToken();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 認証結果がまだ分からない場合、ローディング表示
    }

    return <>{children}</>; // 認証が成功した場合のみ子コンポーネントを表示
};

export default AuthGuard;
