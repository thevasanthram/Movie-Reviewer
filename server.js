const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');

// connecting online mongoDB database
const db = mongoose
  .connect(
    'mongodb+srv://admin:admin@movieapp.i0wrv.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(console.log('MongoDB connection successfully established'))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.end('Test using POSTMAN API');
});

// api function to add movie object to database
app.post('/add', async (req, res) => {
  try {
    const movieName = req.body.movieName;
    const rating = req.body.rating;
    const cast = req.body.cast;
    const genre = req.body.genre;
    const releaseDate = req.body.releaseDate;

    const movie = await Movie.create({
      MovieName: movieName,
      Rating: rating,
      Cast: cast,
      Genre: genre,
      ReleaseDate: releaseDate,
    });

    return res.json({
      message: 'success',
      Movie: movie,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// api function to read all the movie objects in database
app.get('/read', async (req, res) => {
  try {
    const movie = await Movie.find();
    return res.json({
      status: 'success',
      Movie: movie,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// api function to update already stored movie object in database
app.put('/update', async (req, res) => {
  try {
    const movieName = req.body.movieName;
    const rating = req.body.rating;
    const cast = req.body.cast;
    const genre = req.body.genre;
    const releaseDate = req.body.releaseDate;

    const movie = await Movie.updateOne(
      { MovieName: movieName },
      {
        $set: {
          Rating: rating,
          Cast: cast,
          Genre: genre,
          ReleaseDate: releaseDate,
        },
      }
    );

    return res.json({
      status: 'success',
      Movie: movie,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// api function to delete a movie object in database
app.delete('/delete', async (req, res) => {
  try {
    const movieName = req.body.movieName;
    const movie = await Movie.deleteOne({ MovieName: movieName });
    return res.json({
      status: 'success',
      movie: movie,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// app listening on localhost port 5000
app.listen(80, () => {
  console.log('API running on port 80');
});
