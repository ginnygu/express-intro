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

//dynamic, :<req.params:name>
app.get("/genre/:genreName", (req, res) => {
	//http://localhost:3000/genre/action
	// console.log(req.params); //{ genreName: 'action' }
	// console.log(req.params.genreName); // action
	const genre = req.params.genreName.toLowerCase();

	const filteredByGenre = movies.filter((film) => {
		return film.Genre.toLowerCase().includes(genre);
	});

	res.status(200).json({ data: filteredByGenre });
});
// update the app.get genre to filter movies based on the genreName we pass in and respond back to the browser with the list of the filtered films.

app.get("/about", (req, res) => {
	res.status(200).send("from about page");
});

// Create = POST Request
// Update = PUT Request/ Patch
// Delete = DELETE request

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
