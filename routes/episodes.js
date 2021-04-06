var express = require('express');

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello episodes!');
})

router.get(`/details`, async function (req, res) {
  console.log('req.params', req.query);
  const ep_id = req.query.id;

  // Obtiene detalles del episodio
  const ep_details = await req.axiosInstance.get(`/episodes/${ep_id}`);
  console.log('ep_details', ep_details);

  res.render('episodes/details.ejs', {
    episode: ep_details[0], 
  });
})

module.exports = router;
