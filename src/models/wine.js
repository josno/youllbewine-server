const mongoose = require("mongoose");

const d = new Date();

const wineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Wine must have name"],
		unique: true,
	},
	color: { type: String, required: [true, "Wine must have color"] },
	country: {
		type: String,
		required: [true, "Wine must have country"],
	},
	image: {
		type: String,
	},
	food_pairings: [{ type: String, required: true }],
	date_added: {
		type: Date,
		default: new Date().toISOString(),
	},
});

const Wine = mongoose.model("Wine", wineSchema);
module.exports = Wine;
