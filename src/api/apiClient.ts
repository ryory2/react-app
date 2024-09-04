// src/api/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Axiosインスタンスを作成し、ベースURLやタイムアウトを設定
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    timeout: 10000, // タイムアウトの設定
    headers: {
        'Content-Type': 'application/json',
    },
});

// // リクエストインターセプターの設定
// apiClient.interceptors.request.use(
//     (config: AxiosRequestConfig): AxiosRequestConfig => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // レスポンスインターセプターの設定
// apiClient.interceptors.response.use(
//     (response: AxiosResponse): AxiosResponse => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.log('Unauthorized, logging out...');
//             // ログアウトやエラーハンドリングの処理を追加
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
