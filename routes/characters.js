var express = require('express');

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello characters!');
})

router.get(`/details`, async function (req, res) {
  const charName = req.query.name;

  // Get API info of character
  let char_details = await req.axiosInstance.get(`/characters?name=${charName}`);
  char_details = char_details[0];

  // Get API character quotes
  let char_quotes = await req.axiosInstance.get(`/quote?author=${charName}`);
  console.log('quotes', char_quotes);

  console.log('char_details', char_details);

  // Renerizamos la view
  res.render('characters/details.ejs', {
    char: char_details,
    quotes: char_quotes,
  });
})

module.exports = router;
