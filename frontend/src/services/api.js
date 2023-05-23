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
