import express from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import resturantRoutes from './routes/resturantRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
dotenv.config();

// Database connection
connectDb()
//rest object
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resturant", resturantRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/food', foodRoutes);
// localhost
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to food server</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.gray.bold);
});
