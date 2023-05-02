"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMovies = exports.updateMovie = exports.deleteMovie = exports.addMovie = exports.getMovieById = exports.getMovies = void 0;
var movie_model_1 = require("../models/movie.model");
var getMovies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movies, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movie_model_1.default.find().select('director').exec()];
            case 1:
                movies = _a.sent();
                res.json(movies);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMovies = getMovies;
var getMovieById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movie, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movie_model_1.default.findById(req.params.id)];
            case 1:
                movie = _a.sent();
                if (movie) {
                    res.json(movie);
                }
                else {
                    res.status(404).json({ error: 'Фільм не знайдено' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMovieById = getMovieById;
var addMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, director, genre, year, addedAt, movie, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, director = _a.director, genre = _a.genre, year = _a.year, addedAt = _a.addedAt;
                movie = new movie_model_1.default({ title: title, director: director, genre: genre, year: year, addedAt: addedAt });
                console.log(movie);
                return [4 /*yield*/, movie.save()];
            case 1:
                _b.sent();
                res.json({ message: 'Фільм додано успішно' });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addMovie = addMovie;
var deleteMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movie, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movie_model_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                movie = _a.sent();
                if (movie) {
                    res.json({ message: 'Фільм видалено успішно' });
                }
                else {
                    res.status(404).json({ error: 'Фільм не знайдено' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteMovie = deleteMovie;
var updateMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, director, genre, year, addedAt, movie, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, director = _a.director, genre = _a.genre, year = _a.year, addedAt = _a.addedAt;
                return [4 /*yield*/, movie_model_1.default.findByIdAndUpdate(req.params.id, { title: title, director: director, genre: genre, year: year, addedAt: addedAt }, { new: true })];
            case 1:
                movie = _b.sent();
                if (movie) {
                    res.json({ message: 'Дані про фільм оновлено успішно' });
                }
                else {
                    res.status(404).json({ error: 'Фільм не знайдено' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateMovie = updateMovie;
var sortMovies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, field, order, sortOrder, movies, err_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.query, field = _a.field, order = _a.order;
                sortOrder = order === 'desc' ? -1 : 1;
                return [4 /*yield*/, movie_model_1.default.find().sort((_b = {}, _b[field] = sortOrder, _b))];
            case 1:
                movies = _c.sent();
                res.json(movies);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _c.sent();
                res.status(500).json({ error: 'Помилка сервера' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sortMovies = sortMovies;
