const express = require('express');
import DocumentRoutes from './src/routes/DocumentRoutes';
import AuthRoutes from './src/routes/AuthRoutes';
import ImageRoutes from './src/routes/ImageRoutes';
import RecoveryRoutes from './src/routes/RecoveryRoutes';
import cors from 'cors';

import { cronProsess } from './src/lib/cron';

const app = express();

app.use(express.json());
app.use("/api", DocumentRoutes);
app.use("/api", AuthRoutes);
app.use("/api", ImageRoutes);
app.use("/api", RecoveryRoutes);

app.use(
  cors({
    origin: process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

cronProsess.startJobCron();
console.log("Le cron job est démarré !");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});