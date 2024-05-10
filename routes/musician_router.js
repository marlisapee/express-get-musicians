const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Musician } = require('../models');

router.get('/', async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get('/:id', async (req, res) => {
  try {
    const musicianId = req.params.id;
    const musician = await Musician.findByPk(musicianId);
    if (!musician) res.status(404).send('musician does not exist...');
    res.json(musician);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  '/',
  [
    check('name').not().isEmpty().trim(),
    check('instrument').not().isEmpty().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.json({ error: errors.array() });

      const newMusicianDetails = req.body;
      const musician = await Musician.create(newMusicianDetails);
      res.status(202).send(musician);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
