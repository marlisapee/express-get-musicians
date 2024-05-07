const express = require('express');
const app = express();
const { Musician } = require('../models/index');
const { db } = require('../db/connection');

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create a GET /musicians route to return all musicians

app.get('/musicians', async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get('/musicians/:id', async (req, res) => {
  try {
    const musicianId = req.params.id;
    const musician = await Musician.findByPk(musicianId);
    if (!musician) res.status(404).send('musician does not exist...');
    res.json(musician);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/musicians', async (req, res) => {
  try {
    const newMusicianDetails = req.body;
    const musician = await Musician.create(newMusicianDetails);
    res.status(202).send(musician);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/musicians/:id', async (req, res) => {
  try {
    const musicianId = req.params.id;
    const musician = await Musician.findByPk(musicianId);
    if (!musician) res.status(404).send('Musician does not exist...');
    const updatedMusician = await musician.update(req.body);
    res.status(202).json(updatedMusician);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/musicians/:id', async (req, res) => {
  try {
    const musicianId = req.params.id;
    const musician = await Musician.findByPk(musicianId);
    if (!musician) res.status(404).send('musician does not exist...');
    await musician.destroy();
    res.status(200).send('deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app;
