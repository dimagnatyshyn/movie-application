import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import movieRoute from './routes/movie.route';

mongoose
    .connect('mongodb://localhost:27017/movies')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed connection to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});