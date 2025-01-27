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
exports.AuthController = void 0;
const AuthService_1 = require("../service/AuthService");
const Error_1 = require("../utils/Error");
const jwt = require('jsonwebtoken');
;
exports.AuthController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield AuthService_1.AuthService.registerUser(email, password);
                res.status(201).json(user);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const { user, token } = yield AuthService_1.AuthService.loginUser(email, password);
                const userInterface = {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    imageUrl: user === null || user === void 0 ? void 0 : user.imageProfile,
                    boardingStatus: user === null || user === void 0 ? void 0 : user.boardingStatus
                };
                res.status(200).json({ token, user: userInterface });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    psw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { password } = req.body;
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                const response = yield AuthService_1.AuthService.checkPassword(payload.email, password);
                console.log(response);
                res.status(200).json(response);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                const user = yield AuthService_1.AuthService.findUser(payload.id);
                console.log("user", user);
                const userInterface = {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    imageUrl: user === null || user === void 0 ? void 0 : user.imageProfile,
                    boardingStatus: user === null || user === void 0 ? void 0 : user.boardingStatus
                };
                res.status(200).json({ user: userInterface });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                const isAdmin = yield AuthService_1.AuthService.checkAdmin(payload.id);
                if (!isAdmin) {
                    throw new Error_1.ErrorClass(403, 'You are not admin');
                }
                const users = yield AuthService_1.AuthService.findAllUsers();
                const userInterfaces = users.map((user) => ({
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    imageUrl: user === null || user === void 0 ? void 0 : user.imageProfile,
                    boardingStatus: user === null || user === void 0 ? void 0 : user.boardingStatus,
                    createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
                    updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt
                }));
                res.status(200).json({ users: userInterfaces });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                if (payload) {
                    const request = yield AuthService_1.AuthService.findUser(payload.id);
                    const userInterface = {
                        id: request === null || request === void 0 ? void 0 : request.id,
                        email: request === null || request === void 0 ? void 0 : request.email,
                        name: request === null || request === void 0 ? void 0 : request.name,
                        role: request === null || request === void 0 ? void 0 : request.role,
                        imageUrl: request === null || request === void 0 ? void 0 : request.imageProfile,
                        boardingStatus: request === null || request === void 0 ? void 0 : request.boardingStatus
                    };
                    res.status(200).json({ user: userInterface, token });
                }
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name, email, imageUrl, boardingStatus, password, role } = req.body;
            console.log(req.body);
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                if (payload) {
                    const request = yield AuthService_1.AuthService.updateUser(payload.id, email, name, imageUrl, boardingStatus, password, role);
                    const userInterface = {
                        id: request === null || request === void 0 ? void 0 : request.id,
                        email: request === null || request === void 0 ? void 0 : request.email,
                        name: request === null || request === void 0 ? void 0 : request.name,
                        role: request === null || request === void 0 ? void 0 : request.role,
                        imageUrl: request === null || request === void 0 ? void 0 : request.imageProfile,
                        boardingStatus: request === null || request === void 0 ? void 0 : request.boardingStatus
                    };
                    res.status(200).json({ user: userInterface });
                }
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
};
//# sourceMappingURL=AuthController.js.map