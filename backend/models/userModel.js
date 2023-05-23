// backend\src\app\models\userModel.js

import bcrypt from "bcryptjs";
import { db } from "../database/prisma/prismaClient.js";

export const createUser = async ({ name, password, email, isAdmin }) => {
    const hashedPassword = await hashPassword(password);
    const newUser = await db.user.create({
        data: { name, password: hashedPassword, email, isAdmin },
    });

    return newUser;
};

export const getUserByEmail = async (email) => {
    const user = await db.user.findUnique({ where: { email } });
    return user ? omitPassword(user) : null;
};

export const authUser = async (email, password) => {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Password is incorrect");
    }

    return user;
}

export const getUserById = async (id) => {
    return await db.user.findUnique({ where: { id } });
}

export const updateUserProfileData = async ({ userId, name, email }) => {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error('User not found');
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { name: user.name, email: user.email }
    });

    return updatedUser;
}

export const updateUserPassword = async (id, newPassword) => {
    const hashedPassword = await hashPassword(newPassword);
    const user = await db.user.update({ where: { id }, data: { password: hashedPassword } });
    return user ? omitPassword(user) : null;
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
