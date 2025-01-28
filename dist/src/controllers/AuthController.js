import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';
const jwt = require('jsonwebtoken');
;
export const AuthController = {
    async register(req, res) {
        const { email, password } = req.body;
        try {
            const user = await AuthService.registerUser(email, password);
            res.status(201).json(user);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { user, token } = await AuthService.loginUser(email, password);
            const userInterface = {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                role: user?.role,
                imageUrl: user?.imageProfile,
                boardingStatus: user?.boardingStatus
            };
            res.status(200).json({ token, user: userInterface });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async psw(req, res) {
        const { password } = req.body;
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const response = await AuthService.checkPassword(payload.email, password);
            console.log(response);
            res.status(200).json(response);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async user(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const user = await AuthService.findUser(payload.id);
            console.log("user", user);
            const userInterface = {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                role: user?.role,
                imageUrl: user?.imageProfile,
                boardingStatus: user?.boardingStatus
            };
            res.status(200).json({ user: userInterface });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async users(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const isAdmin = await AuthService.checkAdmin(payload.id);
            if (!isAdmin) {
                throw new ErrorClass(403, 'You are not admin');
            }
            const users = await AuthService.findAllUsers();
            const userInterfaces = users.map((user) => ({
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
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async check(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const request = await AuthService.findUser(payload.id);
                const userInterface = {
                    id: request?.id,
                    email: request?.email,
                    name: request?.name,
                    role: request?.role,
                    imageUrl: request?.imageProfile,
                    boardingStatus: request?.boardingStatus
                };
                res.status(200).json({ user: userInterface, token });
            }
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async update(req, res) {
        const { name, email, imageUrl, boardingStatus, password, role } = req.body;
        console.log(req.body);
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const request = await AuthService.updateUser(payload.id, email, name, imageUrl, boardingStatus, password, role);
                const userInterface = {
                    id: request?.id,
                    email: request?.email,
                    name: request?.name,
                    role: request?.role,
                    imageUrl: request?.imageProfile,
                    boardingStatus: request?.boardingStatus
                };
                res.status(200).json({ user: userInterface });
            }
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
};
//# sourceMappingURL=AuthController.js.map