const request = require('supertest');
const server = require('./server.js');
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);

// afterEach(async () => {
//     await db('games').truncate();
// });
describe('/games', () => {
  it('responds with 200', async () => {
    const response = await request(server).get('/games');

    expect(response.status).toBe(200);
  });

  it('responds with json', async () => {
    const response = await request(server).get('/games');

    expect(response.type).toBe('application/json');
  });

  it('should not return an empty array', async () => {
    const res = await request(server).get('/games');

    expect(res.body).not.toEqual([]);
  });
});

describe('post to /games', () => {
  it('responds with 201 when body is correct', async () => {
    const body = {
      title: 'Earthworm Jim',
      genre: 'NES',
      releaseYear: 1991
    };
    const response = await request(server)
      .post('/games')
      .send(body);

    expect(response.status).toBe(201);
  });

  it('responds with 422 when body is missing data', async () => {
    const missing = { title: 'test', releaseYear: 2019 };
    const response = await request(server)
      .post('/games')
      .send(missing);

    expect(response.status).toBe(422);
  });

  it('should return json', async () => {
    await db('games').insert({
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    });

    const res = await request(server).post('/games');
    expect(res.type).toBe('application/json');
  });
});
