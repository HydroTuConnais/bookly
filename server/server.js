const dotenv = require("dotenv");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authMiddleware = require('./authMiddleware'); // Importez le middleware

dotenv.config();

const app = express();
const env = process.env;

// Connecter à la base de données SQLite
const db = new sqlite3.Database('./data/database.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

// Utiliser le middleware CORS
app.use(cors());

app.use(express.json());

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const params = [email, password];

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (row) {
            // Generate a token
            const token = jwt.sign({ email: row.email }, env.JWT_SECRET, { expiresIn: '30min' });
            res.json({
                message: 'success',
                data: {
                    userName: row.userName,
                    email: row.email,
                    token: token
                }
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

app.get('/api/auth/check', authMiddleware, (req, res) => {
    res.json({ isAuthenticated: true });
});

app.listen(env.SERVER_PORT, () => {
    console.log(`🔧 Server is running on port ${env.SERVER_PORT}`);
});

// Fermer la connexion à la base de données lorsque le processus se termine
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la base de données:', err.message);
        } else {
            console.log('Connexion à la base de données fermée.');
        }
        process.exit(0);
    });
});

app.use(cors({
    origin: 'http://localhost:3000'
}));