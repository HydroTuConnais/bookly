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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryController = void 0;
const RecoveryService_1 = require("../service/RecoveryService");
const AuthService_1 = require("../service/AuthService");
const Error_1 = require("../utils/Error");
const resend_1 = require("../lib/resend");
const axios_1 = __importDefault(require("axios"));
const jwt = require('jsonwebtoken');
exports.RecoveryController = {
    sendRemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email } = req.body;
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const response = yield AuthService_1.AuthService.findUser(payload.id);
                if (response) {
                    const user = yield AuthService_1.AuthService.findUser(response.id);
                    const infoReq = yield RequestInfo.getRequestInfo(req);
                    if (!(user === null || user === void 0 ? void 0 : user.email)) {
                        throw new Error_1.ErrorClass(404, 'User not found');
                    }
                    try {
                        if ((user === null || user === void 0 ? void 0 : user.email) && (user === null || user === void 0 ? void 0 : user.name) && infoReq.ip) {
                            (0, resend_1.changeEmail)(user.email, email, user.name, `http://localhost:3000/recovery/email/${user.id}/${token}`, infoReq.ip, infoReq.country || 'Unknown');
                            RecoveryService_1.RecoveryService.inputRegisteryEmail(user.email, email, token);
                        }
                        else {
                            throw new Error_1.ErrorClass(400, 'Email or Name or IP or Country is missing');
                        }
                    }
                    catch (error) {
                        console.error(error.message);
                        res.status(500).json({ error: "Failed to send email" });
                    }
                }
                try {
                    res.status(200).json({ message: "Email sent successfully" });
                }
                catch (error) {
                    console.error(error.message);
                    res.status(500).json({ error: "Failed to send email" });
                }
            }
        });
    },
    recoveryEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            try {
                const user = yield AuthService_1.AuthService.findUser(id);
                if (!user) {
                    throw new Error_1.ErrorClass(404, 'User not found');
                }
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                if (payload) {
                    console.log("payload", payload);
                    const reponse = yield RecoveryService_1.RecoveryService.getRecoveryId(payload.email);
                    if (reponse) {
                        console.log("reponsemail", reponse);
                        const request = yield AuthService_1.AuthService.updateUser(payload.id, reponse.email, null, null, null, null, null);
                        res.status(200).json({ reponse: "Email updated successfully" });
                        if (request) {
                            //await RecoveryService.deleteRecoveryId(payload.email);
                        }
                    }
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update email" });
            }
        });
    },
    recoveryPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            try {
                const user = yield AuthService_1.AuthService.findUser(id);
                if (!user) {
                    throw new Error_1.ErrorClass(404, 'User not found');
                }
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                if (payload) {
                    console.log("payload", payload);
                    const reponse = yield RecoveryService_1.RecoveryService.getRecoveryId(payload.email);
                    if (reponse) {
                        console.log("reponsepassword", reponse);
                        res.status(200).json({ reponse: "Request successfully received" });
                    }
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update password" });
            }
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { password } = req.body;
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const response = yield AuthService_1.AuthService.findUser(payload.id);
                if (response) {
                    const user = yield AuthService_1.AuthService.findUser(response.id);
                    if (!(user === null || user === void 0 ? void 0 : user.email)) {
                        throw new Error_1.ErrorClass(404, 'User not found');
                    }
                    try {
                        if ((user === null || user === void 0 ? void 0 : user.email) && (user === null || user === void 0 ? void 0 : user.name)) {
                            const request = yield AuthService_1.AuthService.updateUser(payload.id, user.email, null, null, null, password, null);
                            if (request) {
                                res.status(200).json({ message: "Password updated successfully" });
                            }
                        }
                        else {
                            throw new Error_1.ErrorClass(400, 'Email or Name is missing');
                        }
                    }
                    catch (error) {
                        res.status(500).json({ error: "Failed to update password" });
                    }
                }
            }
        });
    },
    sendRPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const response = yield AuthService_1.AuthService.findUser(payload.id);
                if (response) {
                    const user = yield AuthService_1.AuthService.findUser(response.id);
                    const infoReq = yield RequestInfo.getRequestInfo(req);
                    if (!(user === null || user === void 0 ? void 0 : user.email)) {
                        throw new Error_1.ErrorClass(404, 'User not found');
                    }
                    try {
                        if ((user === null || user === void 0 ? void 0 : user.email) && (user === null || user === void 0 ? void 0 : user.name) && infoReq.ip) {
                            console.log(user.email);
                            (0, resend_1.changePassword)(user.email, user.name, `http://localhost:3000/recovery/password/${user.id}/${token}`, infoReq.ip, infoReq.country || 'Unknown');
                            console.log("TEST INTER");
                            RecoveryService_1.RecoveryService.inputRegisteryPassword(user.email, token);
                        }
                        else {
                            throw new Error_1.ErrorClass(400, 'Email or Name or IP or Country is missing');
                        }
                    }
                    catch (error) {
                        res.status(500).json({ error: "Failed to send email" });
                    }
                }
                try {
                    res.status(200).json({ message: "Email sent successfully" });
                }
                catch (error) {
                    res.status(500).json({ error: "Failed to send email" });
                }
            }
            ;
        });
    },
};
const RequestInfo = {
    getRequestInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            try {
                const response = yield axios_1.default.get(`http://ip-api.com/json/${ip}`);
                return {
                    ip: ip.toString(),
                    city: response.data.city,
                    country: response.data.country,
                    region: response.data.regionName
                };
            }
            catch (error) {
                return { ip: ip.toString() };
            }
        });
    },
};
//# sourceMappingURL=RecoveryController.js.map