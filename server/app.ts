const express = require('express');
import DocumentRoutes from './routes/DocumentRoutes';
import AuthRoutes from './routes/AuthRoutes';

const app = express();

app.use(express.json());
app.use("/api", DocumentRoutes);
app.use(AuthRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});