import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


// 使ってないけどメモ書きとして使っている


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
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
    // `export const コンポーネント名: React.FC<{ 変数: 変数の型 }> = ({ 本コンポーネントで利用する際の変数名 }) => { ... }`

    // ■■export
    // 概要: `export`は、モジュールからコードを他のファイルで使えるようにするためのキーワードです。
    // 猿でもわかるくらい簡単な言葉で説明: これを使うと、他のファイルでこのコードを使えるようになります。
    // javaで例えると: Javaの`public`キーワードと`import`文に似ています。
    // 使い方の例: `export const ＜コンポーネント名＞ = () => { ... };`
    // どのタイミングで利用されるか: コードを他のファイルやモジュールに公開したいときです。

    // ■■React.FC<{ children: ReactNode }>
    // 概要: `React.FC`は、Functional Componentの型を指定するためのTypeScriptの型定義です。
    // 猿でもわかるくらい簡単な言葉で説明: これは「関数型コンポーネント」の特別なタイプです。
    // javaで例えると: Javaのインターフェースのようなものです。
    // 目的: TypeScriptでコンポーネントの型を指定するためです。
    // 使い方の例: `const MyComponent: React.FC<{ children: ReactNode }> = ({ children }) => { ... }`
    // どのタイミングで利用されるか: TypeScriptでReactコンポーネントを定義するときです。

    // ■■({ children })
    // 概要: これは、コンポーネントが受け取るpropsを分解するための構文です。
    // 猿でもわかるくらい簡単な言葉で説明: コンポーネントがもらうデータを取り出す方法です。
    // javaで例えると: Javaのメソッド引数のようなものです。
    // 目的: コンポーネントに渡されたデータを使いやすくするためです。
    // 使い方の例: `const MyComponent = ({ children }) => { ... }`
    // どのタイミングで利用されるか: コンポーネントがpropsを受け取るときです。
    // どこに利用されるか: 任意のReactコンポーネントで使用されます。

    // 「」    // React.FC<{ children: ReactNode }>：このコンポーネントが子コンポーネントを受け取ることを示します。
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
            axios.post('/api/v1/auth/jwt', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                // 役割：トークンの有効性をサーバーに確認するリクエストを送信
                // 目的：トークンが有効かどうかを確認するため

                .then(response => {
                    // 役割：サーバーのレスポンスを処理
                    if (response.status === 204) {
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
        // AuthContext.ProviderはReactコンテキスト
        // アプリ全体で一つのインスタンス（ここでは認証情報）を共有する
        // 「value={{ isAuthenticated, login, logout }}」は「AuthContext.Provider」に渡す値

        // 役割：子コンポーネントをラップして認証状態を提供
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
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
