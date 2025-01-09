const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { AuthRepository } from '../repository/AuthRepository';
import { ErrorClass } from '../utils/Error';

export const AuthService = {
  async registerUser(email: string, password: string) {
    
    if (!email || !password) {
      throw new ErrorClass(400,'Email and password are required');
    }

    if (await AuthRepository.findUserByEmail(email)) {
      throw new ErrorClass(409,'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await AuthRepository.createUser({ email, password: hashedPassword });
  },

  async loginUser(email: string, password: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ErrorClass(400,'Email and password are required');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
    return { user, token };
  },

  async checkToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (error) {
      throw new ErrorClass(404,'Invalid or expired token');
    }
  },

  async findUserEmail(email: string) {
    try {
      return await AuthRepository.findUserByEmail(email);
    }
    catch (error) {
      throw new ErrorClass(404,'User not found');
    }
  }
};


export const authenticate = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};