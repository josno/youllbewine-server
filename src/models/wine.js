const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Wine must have name"],
		unique: true,
	},
	color: {
		type: String,
		required: [true, "Wine must have color"],
	},
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
		default: Date.now,
	},
});

const Wine = mongoose.model("Wine", wineSchema);
module.exports = Wine;
