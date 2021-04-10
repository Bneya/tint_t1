var express = require('express');
var moment = require('moment');

const router = express.Router();

// Funciones de utilidad
function transformSearchableCharacters(charArray){
  const searchableArray = [];
  const spaceyRegex = /\s+/g;
  charArray.forEach((char) => {
    const searchableChar = {
      name: char,
      searchableName: char.replace(spaceyRegex, "+")
    };
    searchableArray.push(searchableChar)
  });

  return searchableArray;
}

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello episodes!');
})

router.get(`/details`, async function (req, res) {

  const ep_id = req.query.id;

  // Obtiene detalles del episodio
  let ep_details = await req.axiosInstance.get(`/episodes/${ep_id}`);
  ep_details = ep_details[0];
  ep_details.characters = transformSearchableCharacters(ep_details.characters);
  ep_details.air_date = moment(ep_details.air_date).locale('es').format(`DD [ de ] MMMM [ de ] YYYY`);

  // Renerizamos la view
  res.render('episodes/details.ejs', {
    episode: ep_details,
  });
})

module.exports = router;
