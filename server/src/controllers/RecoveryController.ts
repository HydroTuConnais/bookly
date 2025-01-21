import { Request, Response } from 'express';
import { RecoveryService } from '../service/RecoveryService';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';
import { changeEmail } from '../lib/resend';

import axios from 'axios';

const jwt = require('jsonwebtoken');


interface LocationData {
    ip: string;
    city?: string;
    country?: string;
    region?: string;
}

export const RecoveryController = {
    async sendRemail(req: Request, res: Response) {
        const { email } = req.body;
        const token = req.headers.authorization?.split(' ')[1] || '';
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if (payload) {
            const response = await AuthService.findUser(payload.id);
            if (response) {
                console.log(response.id);
                const user = await AuthService.findUser(response.id);
                const infoReq = await RequestInfo.getRequestInfo(req);
                console.log(infoReq);
                if (!user?.email) {
                    throw new ErrorClass(404, 'User not found');
                }

                try {
                    if (user?.email && user?.name && infoReq.ip) {
                        changeEmail(user.email, email, user.name, `http://localhost:3000/recovery/email/${user.id}/${token}`, infoReq.ip, infoReq.country || 'Unknown');
                        RecoveryService.inputRegistery(user.email, email, token);
                    } else {
                        throw new ErrorClass(400, 'Email or Name or IP or Country is missing');
                    }
                } catch (error: any) {
                    console.error(error.message);
                    res.status(500).json({ error: "Failed to send email" });
                }

            }
            try {
                res.status(200).json({ message: "Email sent successfully" });
            } catch (error: any) {
                console.error(error.message);
                res.status(500).json({ error: "Failed to send email" });
            }
        }
    },

    async recoveryEmail(req: Request, res: Response) {
        const { id, token } = req.params;
        console.log(id, token);
        try {
            const user = await AuthService.findUser(id);
            if (!user) {
                throw new ErrorClass(404, 'User not found');
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                const reponse = await RecoveryService.getRecoveryId(user.email);
                if (reponse) {
                    const request = await AuthService.updateUser(payload.id, reponse.email, null, null, null);
                    if (request) {
                        await RecoveryService.deleteRecoveryId(user.email);
                    }
                }
                res.status(200).json({ message: "Email updated successfully" });
            }
        } catch (error: any) {
            res.status(500).json({ error: "Failed to update email" });
        }
    }
};

const RequestInfo = {
    async getRequestInfo(req: Request): Promise<LocationData> {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            return {
                ip: ip.toString(),
                city: response.data.city,
                country: response.data.country,
                region: response.data.regionName
            };
        } catch (error) {
            return { ip: ip.toString() };
        }
    },
}