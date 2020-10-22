const app = require("../src/app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Wine = require("../src/models/wine");
const { expect } = require("chai");

describe("Wine Endpoint", () => {
	let db;

	before("set db instance", () => {
		db = mongoose.connect(`${process.env.TEST_DATABASE_URL}/youllbewine-test`, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		app.set("db", db);
	});

	after("disconnect", () => {
		mongoose.disconnect();
	});

	describe("GET /api/v1/wine", () => {
		beforeEach("set document", async () => {
			const newWine = new Wine({
				name: "Baia Tsitska-Tsolikouri-Krakhuna",
				color: "white",
				country: "Georgia",
				food_pairing: ["tacos"],
				image: "url",
			});

			await newWine.save();
		});

		it("Gets all wine", () => {
			return supertest(app).get(`/api/v1/wines`).expect(200);
		});

		afterEach("delete test entry", async () => {
			await Wine.deleteMany();
		});
	});

	describe("POST /api/v1/wine", () => {
		const newWine = {
			name: "Baia Tsitska-Tsolikouri-Krakhuna",
			color: "white",
			country: "Georgia",
			food_pairing: ["tacos"],
			image: "url",
		};

		it("Adds new wine", () => {
			return supertest(app).post(`/api/v1/wines`).send(newWine).expect(201);
		});

		afterEach("delete test entry", async () => {
			await Wine.deleteMany();
		});
	});

	describe("GET /api/v1/wine/:wineId", () => {
		const testWine = {
			name: "Baia Tsitska-Tsolikouri-Krakhuna",
			color: "white",
			country: "Georgia",
			food_pairing: ["tacos"],
			image: "url",
		};
		beforeEach("set document", async () => {
			const newWine = new Wine({
				...testWine,
			});

			await newWine.save();
		});

		it("Gets individual wine by id", async () => {
			const wine = await Wine.findOne({
				name: testWine.name,
			});

			return supertest(app)
				.get(`/api/v1/wines/${wine._id}`)
				.expect(200)
				.then((res) => {
					expect(res.body.name).to.eql(wine.name);
					expect(res.body.food_pairings).to.be.a("array");
					expect(res.body.color).to.eql(wine.color);
					expect(res.body.country).to.eql(wine.country);
					expect(res.body.date_added).to.eql(wine.date_added.toISOString());
				});
		});

		afterEach("delete test entry", async () => {
			await Wine.deleteMany();
		});
	});
});
