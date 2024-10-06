import express from 'express';
import { signup, login, updateUser } from '../controllers/users.controller.js';
import { validateUser } from '../validators/user.validator.js';
import { authorizeToken } from '../auth/auth.js';

export const usersRouter = express.Router();

usersRouter.post('/signup', validateUser, signup);
usersRouter.post('/login', login);
usersRouter.post('/update', authorizeToken, updateUser);