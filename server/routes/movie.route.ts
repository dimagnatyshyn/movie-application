const express = require('express');
import {
    getMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    updateMovie,
    sortMovies,
} from '../controllers/movie.controller';

const router = express.Router();

router.get('/', getMovies);

router.get('/:id', getMovieById);

router.post('/', addMovie);

router.delete('/:id', deleteMovie);

router.put('/:id', updateMovie);

router.get('/sort', sortMovies);

export default router;