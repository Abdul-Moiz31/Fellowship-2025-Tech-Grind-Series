import axios from 'axios';

import { CONFIG } from '../config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;
// ----------------------------------------------------------------------

export const endpoints = {
    auth: {
        me: '/profile',
        signIn: '/auth/login',
        resendToken: `/auth/resend-verification`,
        forgetPassword: `/auth/forgot-password`,
        logout: '/auth/logout',
    }
};