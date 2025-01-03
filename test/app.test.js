const express = require('express');
const request = require('supertest');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/new', (req, res) => {
    res.send('This is the new app feature!');
});

let server;

before(() => {
    // Start the server before running the tests
    server = app.listen(3000, () => {
        console.log('App listening at http://localhost:3000');
    });
});

after(() => {
    // Close the server after the tests are finished
    server.close(() => {
        console.log('Server shut down');
    });
});

describe('GET /', function () {
    it('should return "Hello, World!"', function (done) {
        request(server)
            .get('/')
            .expect(200)
            .expect('Hello, World!', done);
    });
});

describe('GET /new', function () {
    it('should return "This is the new app feature!"', function (done) {
        request(server)
            .get('/new')
            .expect(200)
            .expect('This is the new app feature!', done);
    });
});
