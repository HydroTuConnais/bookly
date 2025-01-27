"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.AuthService = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthRepository_1 = require("../repository/AuthRepository");
const Error_1 = require("../utils/Error");
exports.AuthService = {
    registerUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error_1.ErrorClass(400, 'Email and password are required');
            }
            if (yield AuthRepository_1.AuthRepository.findUserByEmail(email)) {
                throw new Error_1.ErrorClass(409, 'Email already exists');
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            return yield AuthRepository_1.AuthRepository.createUser({ email, password: hashedPassword });
        });
    },
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthRepository_1.AuthRepository.findUserByEmail(email);
            console.log("user", user);
            if (user)
                console.log(yield bcrypt.compare(password, user.password));
            if (!user || !(yield bcrypt.compare(password, user.password))) {
                throw new Error_1.ErrorClass(400, 'Email and password are required');
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
            return { user, token };
        });
    },
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jwt.verify(token, process.env.JWT_SECRET || 'secret');
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Invalid or expired token');
            }
        });
    },
    checkPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new Error_1.ErrorClass(400, 'Password is required');
            }
            const user = yield AuthRepository_1.AuthRepository.findUserByEmail(email);
            if (user) {
                return yield bcrypt.compare(password, user.password);
            }
            else {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    checkAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AuthRepository_1.AuthRepository.findUserById(id);
                if ((user === null || user === void 0 ? void 0 : user.role) === 'ADMIN') {
                    return true;
                }
                if ((user === null || user === void 0 ? void 0 : user.role) === 'OWNER') {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield AuthRepository_1.AuthRepository.findUserById(id);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    findUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield AuthRepository_1.AuthRepository.findUserByEmail(email);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield AuthRepository_1.AuthRepository.findAllUsers();
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    findEmailById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield AuthRepository_1.AuthRepository.findEmainById(id);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'User not found');
            }
        });
    },
    updateUser(id, email, name, imageUrl, boardingStatus, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const hashedPassword = yield bcrypt.hash(password, 10);
                updateUser.password = hashedPassword;
            }
            if (role) {
                updateUser.role = role;
            }
            const response = yield AuthRepository_1.AuthRepository.updateUser(id, updateUser);
            console.log("response", response);
            return response;
        });
    }
};
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.authenticate = authenticate;
//# sourceMappingURL=AuthService.js.map