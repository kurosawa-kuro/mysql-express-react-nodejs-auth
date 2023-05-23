// frontend\src\hooks\auth\useLoginUserHook.js

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { loginUserApi } from '../../services/api.js';

export const useLoginUserHook = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { setFlashMessage } = useFlashMessageStore();

    const loginUserApiMutation = useMutation(
        async () => {
            const user = await loginUserApi({ email, password });
            return user;
        },
        {
            onSuccess: (user) => {
                setUser(user);
                setFlashMessage("User login successful!");
                navigate('/');
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || error.message);
            },
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        loginUserApiMutation.mutate();
    };

    return {
        mutation: loginUserApiMutation,
        submitHandler,
        email,
        setEmail,
        password,
        setPassword
    }
}
