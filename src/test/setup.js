require('dotenv').config();
const mongoose = require("mongoose");

const test_db =
    'mongodb://127.0.0.1:27017';


mongoose
	.connect(test_db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
        useUnifiedTopology: true,
    })

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
