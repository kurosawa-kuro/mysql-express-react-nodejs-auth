// frontend\src\services\api.js

import { getApiClient } from './apiClient.js';

const apiClient = getApiClient();

export const registerUser = async ({ name, email, password }) => {
    const response = await apiClient.post('/api/users', {
        name,
        email,
        password,
    });
    return response.data;
}

export const loginUser = async ({ email, password }) => {
    const response = await apiClient.post('/api/users/auth', { email, password });
    return response.data;
};

export const fetchUserProfile = async () => {
    const response = await apiClient.get('/api/users/profile');
    return response.data;
};

export const updateUserProfile = async ({ name, email, password }) => {
    const response = await apiClient.put('/api/users/profile', {
        name,
        email,
        password,
    });
    return response.data;
};