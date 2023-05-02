import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    addedAt: { type: String, required: true },
    trailerLink: { type: String, required: false },
    imageLink: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
