const express = require("express");
const movies = require("./movies");

const app = express();
const PORT = 3000;

//accept incoming json files
app.use(express.json());
//get is a read
//app.get("url endpoint", callback function with req, res as parameters)
app.get("/", (req, res) => {
	res.status(200).json({ data: movies });
});

app.get("/action", (req, res) => {
	const actionFilms = movies.filter((elem) => {
		//.includes
		//.search
		return elem.Genre.includes("Action");
	});
	// console.log(actionFilms);
	res.status(200).json({ data: actionFilms });
});

//dynamic genre route, :<req.params:name>
app.get("/genre/:genreName", (req, res) => {
	//http://localhost:3000/genre/action
	// console.log(req.params); //{ genreName: 'action' }
	// console.log(req.params.genreName); // action

	//http://localhost:3000/genre/drama
	// console.log(req.params); //{ genreName: 'drama' }
	// console.log(req.params.genreName); // drama

	const genre = req.params.genreName.toLowerCase();

	//explicit returns uses the word return
	const filteredByGenre = movies.filter((film) => {
		return film.Genre.toLowerCase().includes(genre);
	});

	res.status(200).json({ data: filteredByGenre });
});
// update the app.get genre to filter movies based on the genreName we pass in and respond back to the browser with the list of the filtered films.

//make a GET route that finds all films after the year 2010
//make a GET route that finds one film based on Title
//make a GET route that finds films based on the imdbRating using two numbers -Hint: Chain params

// Delete = DELETE request
app.delete("/delete-movie/:imdbID", (req, res) => {
	//.indexOf
	const imdbID = req.params.imdbID;
	//implicit returns
	const findIndexOfMovie = movies.findIndex((film) => film.imdbID === imdbID);
	//.splice(index, how many)
	movies.splice(findIndexOfMovie, 1);
	// console.log(movies);
	res.status(200).json({ data: "movie deleted" });
});

//req.query can make searches more dynamic based on the query name
app.get("/q", (req, res) => {
	//http://localhost:3000/g?actors=lena
	console.log(req.query); //{ actors: lena }
	//Hint: Object methods
	let findMovies;
	for (let key in req.query) {
		//take first letter and make it capitalized
		let firstLetter = key[0].toUpperCase();
		//put them back together and remove the first letter of the original string
		let newKey = firstLetter + key.slice(1);

		findMovies = movies.filter((movie) => {
			return movie[newKey].toLowerCase().includes(req.query[key]);
		});
		console.log(findMovies);
	}
	res.status(200).json({ movies: findMovies });
});

app.get("/about", (req, res) => {
	res.status(200).send("from about page");
});

// Create = POST Request
//in Postman, remember to click Body=> raw => JSON
app.post("/new-movie", (req, res) => {
	const newMovie = {
		Title: req.body.title,
		Year: req.body.year,
		Rated: req.body.rated,
		Released: req.body.released,
		Runtime: req.body.runtime,
		Genre: req.body.genre,
		Director: req.body.director,
		Writer: req.body.writer,
		Actors: req.body.actors,
		Plot: req.body.plot,
		Language: req.body.language,
		Country: req.body.country,
		Awards: req.body.awards,
		Poster: req.body.poster,
		Metascore: req.body.metascore,
		imdbRating: req.body.imdbRating,
		imdbVotes: req.body.imdbVotes,
		imdbID: req.body.imdbID,
		Type: req.body.type,
		Response: req.body.response,
		Images: req.body.images,
	};
	console.log(newMovie);
	let errorArray = [];

	//What are some checks we can do to make sure we're not saving something that is empty or undefined
	for (let key in newMovie) {
		// console.log(key);
		// console.log(newMovie);
		if (newMovie[key] === "" || newMovie[key] === undefined) {
			errorArray.push(`${key} cannot be empty`);
		}
		if (key === "Images" && newMovie.Images.length === 0) {
			errorArray.push("images array cannot be empty");
		}
	}
	if (errorArray.length > 0) {
		return res.status(500).json({ error: true, message: errorArray });
	} else {
		movies.push(newMovie);
	}
	res.status(200).json({ message: "Success" });
});

// Update = PUT Request/ Patch Request

app.put("/update-movie/:movieID", (req, res) => {
	const movietoFind = req.params.movieID;
	console.log(movietoFind);

	const originalMovie = movies.find((movie) => {
		return movie.imdbID === movietoFind;
	});

	const movieIndex = movies.findIndex((movie) => {
		return movie.imdbID === movietoFind;
	});
	if (!originalMovie) {
		return res.status(400).json({
			success: false,
			message: "Could not find movie",
		});
	}
	const updatedMovie = { ...originalMovie };
	for (let key in req.body) {
		//take first letter and make it capitalized
		let firstLetter = key[0].toUpperCase();
		//put them back together and remove the first letter of the original string
		let newKey = firstLetter + key.slice(1);
		if (req.body[key]) {
			updatedMovie[newKey] = req.body[key];
		}
	}

	movies[movieIndex] = updatedMovie;

	res.json({
		success: true,
		updatedMovie: updatedMovie,
	});
});

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
