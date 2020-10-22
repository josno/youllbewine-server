require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const wineRouter = require("./routes/wine-route");
const { NODE_ENV } = require("./config");
const app = express();

//routes

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.options("*", cors());
app.use(cors("*"));
// app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(helmet());

app.get("/", (req, res) => {
	res.status(200).send("Wine server");
});

app.use("/api/v1/wines", wineRouter);

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === "production") {
		response = { error: { message: "server error" } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
