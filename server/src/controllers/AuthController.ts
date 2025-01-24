import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';
import { create } from 'domain';


const jwt = require('jsonwebtoken');

interface userInteface {
  id?: string;
  email?: string;
  name?: string | null;
  role?: string;
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
        role: user?.role,
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
      console.log("user", user);
      const userInterface: userInteface = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        imageUrl: user?.imageProfile,
        boardingStatus: user?.boardingStatus
      }
      res.status(200).json({ user: userInterface });
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  },

  async users(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      const isAdmin = await AuthService.checkAdmin(payload.id);
      if (!isAdmin) {
        throw new ErrorClass(403, 'You are not admin');
      }

      const users = await AuthService.findAllUsers();
      const userInterfaces: userInteface[] = users.map((user: any) => ({
        id: user?.id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        imageUrl: user?.imageProfile,
        boardingStatus: user?.boardingStatus,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt
      }));
      res.status(200).json({ users: userInterfaces });
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
          role: request?.role,
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
    const { name,email, imageUrl, boardingStatus, password, role} = req.body;
    console.log(req.body);
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (payload) {
        const request = await AuthService.updateUser(payload.id, email, name, imageUrl, boardingStatus, password, role);
        const userInterface: userInteface = {
          id: request?.id,
          email: request?.email,
          name: request?.name,
          role: request?.role,
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