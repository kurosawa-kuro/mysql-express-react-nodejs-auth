// frontend\src\hooks\user\useUpdateUserHook.js

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useUserStore } from '../../state/store.js';
import { fetchUserProfileApi, updateUserProfileApi } from '../../services/api.js';

const useUpdateUserHook = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { user, setUser } = useUserStore();

    const { data: userProfile, isLoading } = useQuery(['userProfile'], fetchUserProfileApi);

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name);
            setEmail(userProfile.email);
        }
    }, [userProfile]);

    const updateUserMutation = useMutation(
        async ({ name, email, password }) => {
            const updatedUser = await updateUserProfileApi({ name, email, password });
            return updatedUser;
        },
        {
            onSuccess: (updatedUser) => {
                setUser(updatedUser);
                toast.success('Profile updated successfully');
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || error.message);
            },
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            updateUserMutation.mutate({ id: user.id, name, email, password });
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        isLoading,
        submitHandler,
    };
};

export default useUpdateUserHook;
