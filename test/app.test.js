const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Import your app

describe('GET /', function() {
  it('should return "Hello, World!"', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello, World!', done);
  });
});

describe('GET /new', function() {
  it('should return "This is the new app feature!"', function(done) {
    request(app)
      .get('/new')
      .expect(200)
      .expect('This is the new app feature!', done);
  });
});
