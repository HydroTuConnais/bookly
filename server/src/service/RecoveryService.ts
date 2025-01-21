const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { RecoveryRepository } from '../repository/RecoveryRepository';
import { AuthRepository } from '../repository/AuthRepository';
import { ErrorClass } from '../utils/Error';

export const RecoveryService = {
    async inputRegistery(prevemail: string, email: string, token: string) {

        if (!prevemail || !email || !token) {
            throw new ErrorClass(400, 'Email and token are required');
        }

        RecoveryRepository.createRecovery({ prevemail, email, token });
    },

    async getRecoveryId(prevemail: string) {
        try {
            return await RecoveryRepository.getLastRecoveryByPrevEmail(prevemail);
        } catch (error) {
            throw new ErrorClass(404, 'Invalid or expired token');
        }
    },

    async deleteRecoveryId(email: string) {
        try {
            console.log("email", email);
            return await RecoveryRepository.deleteRecoveryId(email);
        } catch (error) {
            throw new ErrorClass(404, 'Invalid or expired token');
        }
    }
};

