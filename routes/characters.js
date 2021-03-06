var express = require('express');

const router = express.Router()

// Funciones de utilidad
function makeSearchable(charArray){
  const searchableArray = [];
  const spaceyRegex = /\s+/g;
  charArray.forEach((char) => {
    char.searchableName = char.name.replace(spaceyRegex, "+")
  });

  return charArray;
}

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello characters!');
})

router.post(`/search`, async function (req, res) {

  // Redirects to GET page
  const name = req.body.name;
  const spaceyRegex = /\s+/g;
  const searchableName = name.trim().replace(spaceyRegex, "+");

  const formedLink = `/characters/search?name=${searchableName}`
  res.redirect(formedLink)
})

router.get(`/search`, async function (req, res) {

  // Obtén y procesa los parámetros recibidos
  const name = req.query.name;
  const currPage = req.query.page ? parseInt(req.query.page) : 1;
  const prevPage = (currPage - 1) > 0 ? (currPage - 1) : 1;
  const nextPage = (currPage + 1);
  const offset = (currPage - 1) * 10;

  // Busca en la API todos los resultados pertinentes y procésalos
  const spaceyRegex = /\s+/g;
  const searchableName = name.trim().replace(spaceyRegex, "+");
  let char_list = await req.axiosInstance.get(`/characters?name=${searchableName}&limit=10&offset=${offset}`);

  char_list = makeSearchable(char_list);

  res.render("characters/search", {
    name,
    prevPage,
    nextPage,
    char_list,
    char_num: char_list.length,
  });
})

router.get(`/details`, async function (req, res) {
  const charName = req.query.name;

  // Get API info of character
  let char_details = await req.axiosInstance.get(`/characters?name=${charName}`);
  char_details = char_details[0];

  // Get API character quotes
  let char_quotes = await req.axiosInstance.get(`/quote?author=${charName}`);

  // Renerizamos la view
  res.render('characters/details.ejs', {
    char: char_details,
    quotes: char_quotes,
  });
})

module.exports = router;
