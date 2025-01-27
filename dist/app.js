"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const DocumentRoutes_1 = __importDefault(require("./src/routes/DocumentRoutes"));
const AuthRoutes_1 = __importDefault(require("./src/routes/AuthRoutes"));
const ImageRoutes_1 = __importDefault(require("./src/routes/ImageRoutes"));
const RecoveryRoutes_1 = __importDefault(require("./src/routes/RecoveryRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use((0, cors_1.default)({
    origin: "*", // Update this to match your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use("/api", DocumentRoutes_1.default);
app.use("/api", AuthRoutes_1.default);
app.use("/api", ImageRoutes_1.default);
app.use("/api", RecoveryRoutes_1.default);
// cronProsess.startJobCron();
// console.log("Le cron job est démarré !");
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map