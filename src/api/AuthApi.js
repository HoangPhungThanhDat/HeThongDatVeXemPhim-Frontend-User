import axiosClient from './axiosClient';

const AuthApi = {
    Login: (Credentials) => axiosClient.post("/login", Credentials),
    Logout: (Credentials) => axiosClient.post("/logout", Credentials),
    Register: (userData) => axiosClient.post("/register", userData),
};

export default AuthApi;