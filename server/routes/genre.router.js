const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// endpoint from the fetchGenres axios request
// asking for the genres associated with a specific movie's id from the DB
// query JOINS the "movies" and "genres" tables through the "movies_genres" junction table
//  to return the genres for a specific movie as an array of objects.

router.get("/:id", (req, res) => {
	const filmId = req.params.id;
	const genreQuery = `
  SELECT "genres"."name" AS "category" FROM "genres"
  JOIN "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
  JOIN "movies" ON "movies"."id" = "movies_genres"."movie_id"
  WHERE "movies"."id" = $1;
  `;

	pool.query(genreQuery, [filmId])
		.then((result) => {
			console.log("GENRE GET REQUEST SUCCESS");
			res.send(result.rows);
		})
		.catch((err) => {
			console.log("ERROR WITH GENRE GET", err);
			res.sendStatus(500);
		});
});

module.exports = router;
