const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { AuthRepository } from '../repository/AuthRepository';

export const AuthService = {
  async registerUser(email: string, password: string) {
    
    if (await AuthRepository.findUserByEmail(email)) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await AuthRepository.createUser({ email, password: hashedPassword });
  },

  async loginUser(email: string, password: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { user, token };
  },

  async checkToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },
};

// Mise à jour du middleware d'authentification
export const authenticate = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};