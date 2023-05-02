"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var movieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    addedAt: { type: String, required: true },
});
var Movie = mongoose_1.default.model('Movie', movieSchema);
exports.default = Movie;
