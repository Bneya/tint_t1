var express = require('express');

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello characters!');
})

module.exports = router;
