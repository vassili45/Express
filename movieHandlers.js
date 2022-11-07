const database = require("./database");
const movies = [
  {
    id: 1,
    firstname: "Citizen Kane",
    lastname: "Orson Wells",
    email: "1941",
    city: false,
    language: 120,
  },
  {
    id: 2,
    firstname: "The Godfather",
    lastname: "Francis Ford Coppola",
    email: "1972",
    city: true,
    language: 180,
  },
  {
    id: 3,
    firstname: "Pulp Fiction",
    lastname: "Quentin Tarantino",
    email: "1994",
    city: true,
    language: 180,
  },
];

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};



module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
