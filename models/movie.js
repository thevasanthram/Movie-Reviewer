const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  MovieName: {
    type: String,
    required: true,
    unique: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
  Cast: {
    type: Array,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  ReleaseDate: {
    type: Date,
    required: true,
  },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
