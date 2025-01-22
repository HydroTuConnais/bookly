import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';


const jwt = require('jsonwebtoken');

interface userInteface {
  id?: string;
  email?: string;
  name?: string | null;
  imageUrl?: string | null;
  boardingStatus?: boolean;
};

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
      const userInterface: userInteface = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        imageUrl: user?.imageProfile,
        boardingStatus: user?.boardingStatus
      }
      res.status(200).json({ token, user: userInterface });

    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async psw(req: Request, res: Response) {
    const { password } = req.body;
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      const response = await AuthService.checkPassword(payload.email, password);
      console.log(response);
      res.status(200).json(response);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async user(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await AuthService.findUser(payload.id);
      res.status(200).json(user);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async check(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (payload) {
        const request = await AuthService.findUser(payload.id);
        const userInterface: userInteface = {
          id: request?.id,
          email: request?.email,
          name: request?.name,
          imageUrl: request?.imageProfile,
          boardingStatus: request?.boardingStatus
        }
        res.status(200).json({ user: userInterface, token });
      }
    } catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    const { name, imageUrl, boardingStatus, password } = req.body;
    console.log(req.body);
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (payload) {
        const request = await AuthService.updateUser(payload.id, null, name, imageUrl, boardingStatus, password);
        const userInterface: userInteface = {
          id: request?.id,
          email: request?.email,
          name: request?.name,
          imageUrl: request?.imageProfile,
          boardingStatus: request?.boardingStatus
        }
        res.status(200).json({ user: userInterface });
      }
    } catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },
};