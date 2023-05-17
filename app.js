const express = require("express");
const movies = require("./movies");

const app = express();
const PORT = 3000;
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

//req.query
app.get("/actors", (req, res) => {
	//http://localhost:3000/actors?n=lena
	console.log(req.query); //{ n: 'lena' }
});

app.get("/about", (req, res) => {
	res.status(200).send("from about page");
});

// Create = POST Request
// Update = PUT Request/ Patch Request

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
