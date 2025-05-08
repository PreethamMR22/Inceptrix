import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // ✅ import cors
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

connectDB();

// ✅ Allow frontend origin (adjust URL if needed)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
