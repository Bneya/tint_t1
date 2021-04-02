var express = require('express');
const seasonsRouter = require('./seasons');
const episodesRouter = require('./episodes');
const charactersRouter = require('./characters');

const router = express.Router();
router.use(`/seasons`, seasonsRouter);
router.use(`/episodes`, episodesRouter);
router.use(`/characters`, charactersRouter);

module.exports = router;
