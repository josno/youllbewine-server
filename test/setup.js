require("dotenv").config();

process.env.TEST_DATABASE_URL = "mongodb://127.0.0.1:27017";

const { expect } = require("chai");
const supertest = require("supertest");

global.expect = expect;
global.supertest = supertest;
