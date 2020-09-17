require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { PORT } = require("./config");

const db = process.env.DATABASE;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log("db connected");
	});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
