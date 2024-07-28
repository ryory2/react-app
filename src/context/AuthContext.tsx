import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ■■ 概要
// Reactのコンテキスト（Context）は、コンポーネント間でデータを共有するための仕組みです。
// これにより、複数のコンポーネントにまたがるデータを一元管理できます。
// ■■ javaで例えると
// Javaで言うところのグローバル変数のようなものです。どのクラスからでもアクセスできる共通のデータを保持するための方法です。
// ■■ どのタイミングで利用されるか
// - グローバルなデータや設定を共有する必要があるとき（例：ユーザー認証情報、テーマ設定、言語設定など）。
// - 複数のコンポーネントで共通のデータを使いたいとき。
// ■■ どこに利用されるか
// - 全体のアプリケーション構成の中で、トップレベルのコンポーネントや特定の機能に関連するコンポーネントツリー内で使われます。
// - 主にsrc/contextフォルダ内で定義され、プロバイダーはsrc/index.tsxやsrc/App.tsxで設定されます。
// MyProviderでラップしてアプリ全体にデータを提供
// const App = () => (
//     <MyProvider>
//       <MyComponent />
//     </MyProvider>
//   );

// 環境変数からAPIのベースURLを設定
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// AuthContextTypeインターフェースを定義し、認証状態と認証操作を保持
interface AuthContextType {
    isAuthenticated: boolean;
    // 役割：認証状態を保持するフラグ
    // 処理結果：認証されている場合はtrue、されていない場合はfalse
    // 呼び出し元：認証状態を確認する各コンポーネント

    login: (token: string) => void;
    // 役割：ログイン処理を行う関数の型定義
    // 処理結果：トークンを保存し、認証状態をtrueに設定
    // 呼び出し元：ログイン処理を行うコンポーネント
    // 書式：login(token: string): void

    logout: () => void;
    // 役割：ログアウト処理を行う関数の型定義
    // 処理結果：トークンを削除し、認証状態をfalseに設定
    // 呼び出し元：ログアウト処理を行うコンポーネント
    // 書式：logout(): void
}

// AuthContextを作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// 役割：認証状態と操作を保持するコンテキストを作成
// 処理結果：認証状態と操作を提供するコンテキストを生成
// 呼び出し元：AuthProvider, useAuth
// AuthContextType | undefined：このContextが持つ値の型を定義します。ここではAuthContextTypeかundefinedを受け取ることができるとしています。
// undefined：Contextのデフォルト値です。

// AuthProviderコンポーネントを作成し、認証状態を管理
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // React.FC<{ children: ReactNode }>：このコンポーネントが子コンポーネントを受け取ることを示します。
    // コンポーネントをエクスポートします。

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    // 書式：const [＜状態変数の名前＞, ＜状態変数を更新するための関数＞] = useState<＜状態変数の型＞>(＜初期値＞);
    // 役割：認証状態を管理するためのステートを定義
    // 処理結果：ローカルストレージにトークンがあるかどうかで初期認証状態を設定
    // 呼び出し元：AuthProvider
    // 書式：useState<boolean>(初期値)
    // 1️⃣localStorage.getItem('token'):
    //      localStorage から 'token' というキーに対応する値を取得します。
    //      値が存在しない場合、null を返します。
    // 2️⃣!localStorage.getItem('token'):
    //      取得した値の真偽値を反転します。
    //      値が存在する場合は false に、存在しない場合は true になります。
    // 3️⃣!!localStorage.getItem('token'):
    //      再度否定することで、元の値を boolean 型に変換します。
    //      値が存在する場合は true に、存在しない場合は false になります。

    const login = (token: string) => {
        // 役割：ログイン処理を行う関数
        localStorage.setItem('token', token);
        // 役割：トークンをローカルストレージに保存
        // 目的：ブラウザをリロードしても認証状態を保持するため
        // アロー関数
        // const 関数名 = (引数1: 型, 引数2: 型, ...): 戻り値の型 => {
        //     関数の処理;
        // }
        // 本来はreturnで変数を返すが、省略もできる

        setIsAuthenticated(true);
        // 役割：認証状態をtrueに設定
        // 目的：認証されたことを示すため
    };

    const logout = () => {
        // 役割：ログアウト処理を行う関数
        localStorage.removeItem('token');
        // 役割：トークンをローカルストレージから削除
        // 目的：ログアウト時に認証情報をクリアするため

        setIsAuthenticated(false);
        // 役割：認証状態をfalseに設定
        // 目的：認証が無効になったことを示すため
    };

    useEffect(() => {
        // 役割：コンポーネントの初回レンダリング時にトークンの検証を行う
        const token = localStorage.getItem('token');
        // 役割：ローカルストレージからトークンを取得
        // 目的：ブラウザをリロードしても認証状態を維持するため

        // 環境変数からAPIのベースURLを取得
        // 開発環境npm startでローカルで開発をする場合「.env.development」が読み込まれる
        // 本番環境npm run buildでのビルドの場合「.env.production」が読み込まれる
        const baseURL = process.env.REACT_APP_API_URL;

        if (token) {
            axios.post('/api/validateToken', { token })
                // 役割：トークンの有効性をサーバーに確認するリクエストを送信
                // 目的：トークンが有効かどうかを確認するため

                .then(response => {
                    // 役割：サーバーのレスポンスを処理
                    if (response.data.valid) {
                        login(token);
                        // 役割：トークンが有効ならログイン処理を実行
                    } else {
                        logout();
                        // 役割：トークンが無効ならログアウト処理を実行
                    }
                })
                .catch(() => {
                    logout();
                    // 役割：エラーハンドリング: 検証リクエストが失敗した場合もログアウト処理を実行
                });
        }
    }, []);
    // 役割：初回レンダリング時に一度だけ実行
    // 目的：初期化処理としてトークンの有効性を確認するため

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
            // 役割：子コンポーネントをラップして認証状態を提供
        </AuthContext.Provider>
    );
};

// useAuthフックを作成し、コンテキストの値を取得
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    // 役割：コンテキストの値を取得
    // 目的：認証状態と操作を利用するため
    // 書式：useContext(Context)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
        // 役割：コンテキストが未定義の場合にエラーをスロー
    }

    return context;
    // 役割：認証状態と操作を返す
};
