const express = require("express");
const { isValidObjectId } = require("mongoose");
const wineRouter = express.Router();
const jsonBodyParser = express.json();
const Wine = require("../models/wine");

wineRouter
	.route("/")
	.get(async (req, res) => {
		try {
			const allWine = await Wine.find();
			res.status(200).send(allWine);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	})
	.post(jsonBodyParser, async (req, res) => {
		const { name, country, color, image, food_pairings } = req.body;
		console.log(req.body);

		const newWine = new Wine({
			name,
			color,
			country,
			image,
			food_pairings,
		});

		try {
			const savedWine = await newWine.save();
			res.status(201).send(savedWine);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	});

wineRouter.route("/:wineId").get(async (req, res) => {
	try {
		const selectedWine = await Wine.findById(req.params.wineId);
		res.status(200).send(selectedWine);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

module.exports = wineRouter;
