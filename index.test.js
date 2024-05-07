// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require('supertest');
const { db } = require('./db/connection');
const { Musician } = require('./models/index');
const app = require('./src/app');
const seedMusician = require('./seedData');

describe('./musicians endpoint', () => {
  test('endpoint should return a 200 status code', async () => {
    const response = await request(app).get('/musicians');
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /musicians/1 should delete the musician with id 1', async () => {
    const response = await request(app).delete('/musicians/1');
    expect(response.statusCode).toBe(200);
  });
});
