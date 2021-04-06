var express = require('express');

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello episodes!');
})

router.get(`/details`, function (req, res) {
  console.log('req.params', req.query);
  const ep_id = req.query.id;
  res.send(`Detalles del episodio ${ep_id}`);
})

module.exports = router;
