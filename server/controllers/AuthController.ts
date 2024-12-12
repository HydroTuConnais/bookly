import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';

export const AuthController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await AuthService.registerUser(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const { user, token } = await AuthService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: (error as any).message });
    }
  },

  async check(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    try {
      const decoded = await AuthService.checkToken(token);
      res.json(decoded);
    } catch (error) {
      res.status(401).json({ error: (error as any).message });
    }
  },
};