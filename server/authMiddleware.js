const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const env = process.env;

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded; // Ajoutez les informations décodées à l'objet de requête
        next(); // Passez au middleware suivant ou à la route
    });
};

module.exports = authMiddleware;