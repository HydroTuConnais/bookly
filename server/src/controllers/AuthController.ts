import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';

const jwt = require('jsonwebtoken');


export const AuthController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.registerUser(email, password);
      res.status(201).json(user);

    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const { user, token } = await AuthService.loginUser(email, password);
      res.status(200).json({ token, user });

    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async check(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      const request = await AuthService.findUserEmail(payload.email);
      const user = {
        id: request?.id,
        email: request?.email,
        name: request?.name
      };
      res.status(200).json({ user, token });
    } catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },
};