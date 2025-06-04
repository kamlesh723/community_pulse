import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const registerUser = async (email, username, phone, password) => {
    return axios.post(`${API_BASE_URL}/auth/users/register`, {
        email,
        username,
        phone,
        password
    });
};

// Use axios for consistency
export const verifyOtp = async (email, otp) => {
    return axios.post(`${API_BASE_URL}/auth/users/verify-otp`, {
        email,
        otp
    });
};

export const loginUser = async (email, password) => {
    return axios.post(`${API_BASE_URL}/auth/users/login`, {email, password});
};

export const logoutUser = () => {
    localStorage.removeItem("token"); // Clear auth token
    window.location.reload();
    return "Logged out successfully.";
};

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
};
