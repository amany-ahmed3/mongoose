import * as userService from './user.service.js';

export async function signupController(req, res) {
    try {
        const user = await userService.signup(req.body);

        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userService.login(email, password);

        res.status(200).json({
            message: 'Login successful',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getUserController(req, res) {
    try {
        const user = await userService.getUser(req.query.id);

        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function updateUserController(req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        res.status(200).json({
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function deleteUserController(req, res) {
    try {
        const user = await userService.deleteUser(req.query.id);

        res.status(200).json({
            message: 'User deleted successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}