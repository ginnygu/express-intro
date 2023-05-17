const express = require("express");
const movies = require("./movies");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.status(200).json({ data: movies });
});
app.get("/about", (req, res) => {
	res.status(200).send("from about page");
});

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
