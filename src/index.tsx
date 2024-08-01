import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/reset.css'; // ここでCSSリセットをインポート
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import '@fontsource/noto-sans-jp';

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Noto Sans JP, sans-serif',
//   },
// });

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Noto Sans JP, sans-serif',
//   },
//   palette: {
//     primary: {
//       main: '#3f51b5', // プライマリカラー
//     },
//     secondary: {
//       main: '#009688', // セカンダリカラー(強調表示、アクションボタン、リンク)
// Tealはインディゴとのコントラストが強く、クリーンでプロフェッショナルな印象を与えます。UI要素の強調やアクションボタンに適しています。
// 使用例: 強調表示、アクションボタン、リンク
//     },
//     success: {
//       main: '#CDDC39', // ライム
// Limeは明るくエネルギッシュな色で、インディゴとのバランスが良いです。注意を引くための要素や成功メッセージに適しています。
// 使用例: 成功メッセージ、通知、アイコン
//     },
//     background: {
//       default: '#f5f5f5', // ライトグレー
// Light Grayは落ち着いた背景色として使用され、インディゴや他の強い色と組み合わせることで視認性を高めます。
// 背景、セクション区切り、フォーム背景
//     }
//   }
// });

const theme = createTheme({
  typography: {
    // typography: アプリケーション全体のフォントを設定。
    fontFamily: 'Noto Sans JP, sans-serif',
  },
  palette: {
    // palette: カラーパレットを定義し、各色の用途を設定。
    primary: {
      main: '#3f51b5', // インディゴ
      // アプリケーションの主要な色で、ブランドのアイデンティティを表現します。
      // ヘッダーとナビゲーションバー: ウェブアプリケーションの主要なナビゲーション要素に使用されます。これにより、ユーザーは重要な操作をすばやく認識できます。
      // メインボタン: 送信ボタン、ログインボタンなど、ユーザーが頻繁に使用する重要なアクションボタンに使用されます。
      // リンク: 重要なリンクやインタラクティブな要素にも適用され、目立たせます。
      // アプリケーションのブランドカラーとして使用され、視覚的にユーザーに認識されやすくする。
    },
    secondary: {
      main: '#009688', // ティール
      // Tealはインディゴとのコントラストが強く、クリーンでプロフェッショナルな印象を与えます。UI要素の強調やアクションボタンに適しています。
      // プライマリカラーを補完する色で、強調したい要素や特定のアクションに使用されます。
      // 使用例: 強調表示、アクションボタン、リンク、補助ボタン、アイコン、リンクのホバー
      // セカンダリボタン: キャンセルボタン、オプションボタンなど、プライマリボタンよりも重要度が低いが、依然として重要なアクションに使用されます。
      // 強調表示: 特定のセクションや要素を強調するための背景色やボーダー色。
      // タブナビゲーション: サブセクションやフィルタリングオプションのタブに使用されます。
      // プライマリカラーを補完し、視覚的な階層を強調するために使用。
    },
    success: {
      // main: '#CDDC39', // ライム
      main: '#00ff7f',
      // Limeは明るくエネルギッシュな色で、インディゴとのバランスが良いです。注意を引くための要素や成功メッセージに適しています。
      // 使用例: 成功メッセージ、通知、アイコン
      // 成功メッセージ: フォーム送信後の成功通知や、操作が正常に完了したことを示すフィードバックメッセージに使用されます。
      // 成功アイコン: チェックマークや他の成功を示すアイコンに使用されます。
      // ユーザーにポジティブなフィードバックを提供し、操作が成功したことを明確に伝えます。
    },
    error: {
      main: '#f44336', // エラー
      // 説明: エラーや警告を示すための色です。
      // 使用例: エラーメッセージ、無効な入力フィールド、エラーアイコン
      // エラーメッセージ: フォームの検証エラーやシステムエラーなど、問題が発生した際に表示されるメッセージに使用されます。
      // エラーアイコン: 警告アイコンやエラーマークに使用されます。
      // 無効な入力: 入力フィールドが無効な状態を示すための背景色やボーダー色。
      // ユーザーに問題やエラーを明確に伝え、修正が必要であることを示す。
    },
    warning: {
      main: '#FF9800', // 警告
      // 説明: 注意を促すための色です。
      // 使用例: 警告メッセージ、警告アイコン、重要な通知
      // 警告メッセージ: 潜在的な問題や注意が必要な状況を示す通知。
      // 重要な通知: 緊急性のある重要な通知やアラート。
      // ユーザーに注意を促し、潜在的な問題や危険を知らせる。
    },
    info: {
      main: '#2196F3', // 情報
      // 説明: 情報を提供するための色です。
      // 使用例: 情報メッセージ、ツールチップ、インフォメーションアイコン
      // 情報メッセージ: ユーザーに追加情報やヒントを提供する通知。
      // ツールチップ: UI要素に関する補足情報を提供するツールチップ。
      // ユーザーに役立つ情報や追加のコンテキストを提供する。

    },
    background: {
      default: '#f5f5f5', // 背景色
      // 説明: アプリケーション全体の背景色です。
      // 使用例: ページ背景、セクション背景、コンテンツ背景
      // カードやモーダルの背景: カードコンポーネントやモーダルウィンドウの背景色。
      paper: '#ffffff', // サーフェスカラー（カードやモーダルの背景色）
    },
    text: {
      primary: '#000000', // メインテキスト
      // メインテキスト: 一般的な段落や見出しのテキストカラー。
      secondary: '#757575', // サブテキスト
      // サブテキスト: 補足情報や小さなテキストの色。
      disabled: '#BDBDBD', // 無効なテキスト
      // 説明: テキストの色です。
      // 使用例: メインテキスト、サブテキスト、リンク
    },
    divider: '#BDBDBD', // ディバイダー
    // 説明: コンテンツ間の区切り線の色です。
    // 使用例: セクションの区切り線、リストアイテムの区切り線
    action: {
      active: '#000000', // アクティブなアクション
      // アクティブなアクション: 現在選択されているアイテムやアクティブなボタンの色。
      hover: '#3f51b5', // ホバー状態
      // ホバー状態: ホバー時のボタンやリンクの背景色。
      selected: '#757575', // 選択状態
      // 選択状態: 選択されたアイテムの背景色。
      disabled: '#BDBDBD', // 無効状態
      disabledBackground: '#E0E0E0', // 無効状態の背景
      // 無効状態: 無効化されたボタンやアクションの背景色。
    },
  },
});

export default theme;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
