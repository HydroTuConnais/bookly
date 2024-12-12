import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';

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
    try {
      const { user, token } = await AuthService.loginUser(email, password);
      res.status(200).json({ token });

    } 
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async check(req: Request, res: Response) {
    try {
      // Verification du token par le middleware ^^
      res.status(200).json({ isAuthenticated: true });
      
    } catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },
};