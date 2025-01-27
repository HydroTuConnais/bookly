"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.AuthService = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthRepository_1 = require("../repository/AuthRepository");
const Error_1 = require("../utils/Error");
exports.AuthService = {
    async registerUser(email, password) {
        if (!email || !password) {
            throw new Error_1.ErrorClass(400, 'Email and password are required');
        }
        if (await AuthRepository_1.AuthRepository.findUserByEmail(email)) {
            throw new Error_1.ErrorClass(409, 'Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await AuthRepository_1.AuthRepository.createUser({ email, password: hashedPassword });
    },
    async loginUser(email, password) {
        const user = await AuthRepository_1.AuthRepository.findUserByEmail(email);
        console.log("user", user);
        if (user)
            console.log(await bcrypt.compare(password, user.password));
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error_1.ErrorClass(400, 'Email and password are required');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
        return { user, token };
    },
    async checkToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'secret');
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Invalid or expired token');
        }
    },
    async checkPassword(email, password) {
        if (!password) {
            throw new Error_1.ErrorClass(400, 'Password is required');
        }
        const user = await AuthRepository_1.AuthRepository.findUserByEmail(email);
        if (user) {
            return await bcrypt.compare(password, user.password);
        }
        else {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async checkAdmin(id) {
        try {
            const user = await AuthRepository_1.AuthRepository.findUserById(id);
            if (user?.role === 'ADMIN') {
                return true;
            }
            if (user?.role === 'OWNER') {
                return true;
            }
            return false;
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async findUser(id) {
        try {
            return await AuthRepository_1.AuthRepository.findUserById(id);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async findUserEmail(email) {
        try {
            return await AuthRepository_1.AuthRepository.findUserByEmail(email);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async findAllUsers() {
        try {
            return await AuthRepository_1.AuthRepository.findAllUsers();
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async findEmailById(id) {
        try {
            return await AuthRepository_1.AuthRepository.findEmainById(id);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'User not found');
        }
    },
    async updateUser(id, email, name, imageUrl, boardingStatus, password, role) {
        if (!id) {
            throw new Error_1.ErrorClass(404, 'Id is required');
        }
        const updateUser = {};
        if (name) {
            updateUser.name = name;
        }
        if (email) {
            updateUser.email = email;
        }
        if (imageUrl) {
            updateUser.imageProfile = imageUrl;
        }
        if (boardingStatus) {
            updateUser.boardingStatus = boardingStatus;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateUser.password = hashedPassword;
        }
        if (role) {
            updateUser.role = role;
        }
        const response = await AuthRepository_1.AuthRepository.updateUser(id, updateUser);
        console.log("response", response);
        return response;
    }
};
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Token required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = payload.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=AuthService.js.map