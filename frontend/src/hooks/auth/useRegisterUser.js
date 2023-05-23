// frontend\src\hooks\auth\useRegisterUser.js

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { registerUserApi } from '../../services/api.js';

export const useRegisterUser = () => {
    const navigate = useNavigate();
    // Local State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Global State
    const { setUser } = useUserStore();
    const { setFlashMessage } = useFlashMessageStore();

    // API Mutation
    const registerUserMutation = useMutation(
        async () => {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            const user = await registerUserApi({ name, email, password });
            return user;
        },
        {
            onSuccess: (user) => {
                setUser(user);
                setFlashMessage("User registration successful!");
                navigate('/');
            },
            onError: (error) => {
                toast.error(error?.message || "An error occurred");
            },
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        registerUserMutation.mutate();
    };

    return {
        mutation: registerUserMutation,
        submitHandler,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword
    }
};
