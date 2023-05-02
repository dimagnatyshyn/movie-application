import { Request, Response } from 'express';
import Movie from '../models/movie.model';

export const getMovies = async (req: Request, res: Response) => {
    try {
        const { field, order } = req.query;
        const sortOrder = order === 'desc' ? -1 : 1;
        const movies = await Movie.find().sort({ [field]: sortOrder }).select('director title genre year addedAt').exec();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie is not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const addMovie = async (req: Request, res: Response) => {
    try {
        const { title, director, genre, year, addedAt, trailerLink, imageLink, country, description} = req.body;
        const movie = new Movie({ title, director, genre, year, addedAt, trailerLink, imageLink, country, description });
        console.log(movie)
        await movie.save();
        res.json({ message: 'Movie has been added' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (movie) {
            res.json({ message: 'Movie has been removed' });
        } else {
            res.status(404).json({ error: 'Movie has not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const { title, director, genre, year, addedAt, trailerLink, imageLink, country, description } = req.body;
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, director, genre, year, addedAt, trailerLink, imageLink, country, description },
            { new: true }
        );
        if (movie) {
            res.json({ message: 'Movie has been updated' });
        } else {
            res.status(404).json({ error: 'Movie has not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const sortMovies = async (req: Request, res: Response) => {
    try {
        const { field, order } = req.query;
        const sortOrder = order === 'desc' ? -1 : 1;
        // @ts-ignore
        const movies = await Movie.find().sort({ [field]: sortOrder });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};