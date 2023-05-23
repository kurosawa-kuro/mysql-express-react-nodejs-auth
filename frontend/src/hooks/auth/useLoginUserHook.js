// frontend\src\hooks\auth\useLoginUserHook.js

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { loginUserApi } from '../../services/api.js';

/**
 * Custom hook for handling user login
 */
export const useLoginUserHook = () => {
    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hooks
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { setFlashMessage } = useFlashMessageStore();

    // loginUserApi mutation
    const loginUserApiMutation = useMutation(
        async () => {
            const user = await loginUserApi({ email, password });
            return user;
        },
        {
            // On success
            onSuccess: (user) => {
                setUser(user);
                setFlashMessage("User login successful!");
                navigate('/');
            },
            // On error
            onError: (error) => {
                toast.error(error?.response?.data?.message || error.message);
            },
        }
    );

    // Submit handler for the form
    const submitHandler = (e) => {
        e.preventDefault();
        loginUserApiMutation.mutate();
    };

    // Return the values from the hook
    return {
        mutation: loginUserApiMutation,
        submitHandler,
        email,
        setEmail,
        password,
        setPassword
    }
}
