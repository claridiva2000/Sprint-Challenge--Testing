const express = require('express');
const server = express();
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);

server.use(express.json());

server.get('/games', (req, res) => {
  db('games')
    .then(games => res.status(200).json(games))
    .catch(err => {
      res.status(500).json({ message: 'Unable to find games:', err });
    });
});

server.post('/games', async (req, res) => {
  const game = req.body;
  if (game.title && game.genre) {
    const posted = await db('games').insert(game);
    res.status(201).json(posted);
  } else {
    res.status(422).json({ message: 'need a name and/or genre' });
  }
});



module.exports = server;
