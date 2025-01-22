const express = require('express');
import DocumentRoutes from './src/routes/DocumentRoutes';
import AuthRoutes from './src/routes/AuthRoutes';
import ImageRoutes from './src/routes/ImageRoutes';
import RecoveryRoutes from './src/routes/RecoveryRoutes';
import cors from 'cors';

import { cronProsess } from './src/lib/cron';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*", // Update this to match your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use("/api", DocumentRoutes);
app.use("/api", AuthRoutes);
app.use("/api", ImageRoutes);
app.use("/api", RecoveryRoutes);

// cronProsess.startJobCron();
// console.log("Le cron job est démarré !");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});