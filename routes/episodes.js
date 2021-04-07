var express = require('express');

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

  // console.log(searchableArray);
  return searchableArray;
}

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello episodes!');
})

router.get(`/details`, async function (req, res) {
  console.log('req.params', req.query);
  const ep_id = req.query.id;

  // Obtiene detalles del episodio
  let ep_details = await req.axiosInstance.get(`/episodes/${ep_id}`);
  ep_details = ep_details[0];
  ep_details.characters = transformSearchableCharacters(ep_details.characters);
  console.log('ep_details', ep_details);

  // transformSearchableCharacters(ep_details.characters);

  res.render('episodes/details.ejs', {
    episode: ep_details,
  });
})

module.exports = router;
