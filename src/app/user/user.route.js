import {Router} from 'express';
import * as userController from './user.controller.js';

 export const userRouter = new Router();

userRouter.post('/signup', userController.signupController);

userRouter.post('/login', userController.loginController);

userRouter.patch('/:id', userController.updateUserController);

userRouter.get('/', userController.getUserController);

userRouter.delete('/', userController.deleteUserController);

