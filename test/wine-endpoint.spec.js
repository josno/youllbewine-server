const app = require("../src/app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Wine = require("../src/models/wine");

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
			return supertest(app).get(`/api/v1/wine`).expect(200);
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
			}

			await newWine.save();

		it("Gets all wine", () => {
            return supertest(app)
                .post(`/api/v1/wine`)
                .send(newWine)
                .expect(201)
		});

		afterEach("delete test entry", async () => {
			await Wine.deleteMany();
		});
	});
});
