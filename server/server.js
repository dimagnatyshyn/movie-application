"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var movie_route_1 = require("./routes/movie.route");
mongoose_1.default
    .connect('mongodb://localhost:27017/movies')
    .then(function () {
    console.log('Connected to MongoDB');
})
    .catch(function (err) {
    console.error('Failed connection to MongoDB:', err);
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/movies', movie_route_1.default);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
