const mongoose = require("mongoose");

new wineSchema() = new mongoose.Schema({
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
	food_pairings: [{ type: String, required: true }],
});

const Wines = mongoose.model("Wines", wineSchema);
module.exports = Wines;
