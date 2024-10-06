import express from 'express';
import { signup, login } from '../controllers/users.controller.js';
import { validateUser } from '../validators/user.validator.js';

export const usersRouter = express.Router();

usersRouter.post('/signup', validateUser, signup);
usersRouter.post('/login', login);