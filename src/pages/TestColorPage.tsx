import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import theme from '../index';

// const theme = createTheme({
//     typography: {
//         fontFamily: 'Noto Sans JP, sans-serif',
//     },
//     palette: {
//         primary: {
//             main: '#3f51b5', // インディゴ
//         },
//         secondary: {
//             main: '#009688', // ティール
//         },
//         success: {
//             main: '#CDDC39', // ライム
//         },
//         error: {
//             main: '#f44336', // エラー
//         },
//         warning: {
//             main: '#FF9800', // 警告
//         },
//         info: {
//             main: '#2196F3', // 情報
//         },
//         background: {
//             default: '#f5f5f5', // 背景色
//             paper: '#ffffff', // サーフェスカラー（カードやモーダルの背景色）
//         },
//         text: {
//             primary: '#000000', // メインテキスト
//             secondary: '#757575', // サブテキスト
//             disabled: '#BDBDBD', // 無効なテキスト
//         },
//         divider: '#BDBDBD', // ディバイダー
//         action: {
//             active: '#000000', // アクティブなアクション
//             hover: '#3f51b5', // ホバー状態
//             selected: '#757575', // 選択状態
//             disabled: '#BDBDBD', // 無効状態
//             disabledBackground: '#E0E0E0', // 無効状態の背景
//         },
//     },
// });

const TestColorPage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default', gap: 2 }}>
            <Button color="primary" variant="contained">
                Primary Button
            </Button>
            <Button color="secondary" variant="contained">
                Secondary Button
            </Button>
            <Button color="success" variant="contained">
                Success Button
            </Button>
            <Button color="error" variant="contained">
                Error Button
            </Button>
            <Button color="warning" variant="contained">
                Warning Button
            </Button>
            <Button color="info" variant="contained">
                Info Button
            </Button>
            <Button color="primary" variant="text" disabled>
                Disabled Text Button
            </Button>
            <Button color="primary" variant="outlined" sx={{ ':hover': { bgcolor: theme.palette.action.hover } }}>
                Hover Outlined Button
            </Button>
        </Box>
        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        //     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default', gap: 2 }}>
        //         <Button color="primary" variant="contained">
        //             Primary Button
        //         </Button>
        // <Button color="secondary" variant="contained">
        //     Secondary Button
        // </Button>
        // <Button color="success" variant="contained">
        //     Success Button
        // </Button>
        // <Button color="error" variant="contained">
        //     Error Button
        // </Button>
        // <Button color="warning" variant="contained">
        //     Warning Button
        // </Button>
        // <Button color="info" variant="contained">
        //     Info Button
        // </Button>
        // <Button color="primary" variant="text" disabled>
        //     Disabled Text Button
        // </Button>
        // <Button color="primary" variant="outlined" sx={{ ':hover': { bgcolor: theme.palette.action.hover } }}>
        //     Hover Outlined Button
        // </Button>
        //     </Box>
        // </ThemeProvider>
    );
};

export default TestColorPage;
