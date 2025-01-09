const express = require('express');
import DocumentRoutes from './src/routes/DocumentRoutes';
import AuthRoutes from './src/routes/AuthRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use("/api", DocumentRoutes);
app.use(AuthRoutes);

app.use(
  cors({
    origin: process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});