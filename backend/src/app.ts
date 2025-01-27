const express = require('express');
import DocumentRoutes from './routes/DocumentRoutes';
import AuthRoutes from './routes/AuthRoutes';
import ImageRoutes from './routes/ImageRoutes';
import RecoveryRoutes from './routes/RecoveryRoutes';
import cors from 'cors';

const morgan = require('morgan');

import { cronProsess } from './lib/cron';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

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