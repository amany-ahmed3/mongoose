import * as userRepo from './user.repository.js'

export async function signup(data) {
    const existingUser = await userRepo.findUserByEmail(data.email);

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const user = await userRepo.createUser(data);

    return user;
}

export async function login(email, password) {
    const user = await userRepo. findUserByEmail(email);

    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }

    return user;
}

export async function getUser(id) {
    const user = await userRepo.findUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export async function updateUser(id, data) {
    if (Object.hasOwn(data, 'password')) {
        throw new Error('Password cannot be updated');
    }

    if (data.email) {
        const existingUser = await userRepo.findUserByEmail(data.email);

        if (existingUser && existingUser._id.toString() !== id) {
            throw new Error('Email already exists');
        }
    }

    const user = await userRepo. updateUserById(id, data);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export async function deleteUser(id) {
    const user = await userRepo.deleteUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}