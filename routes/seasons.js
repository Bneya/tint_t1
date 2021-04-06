var express = require('express');
// const axios = require('axios');

// const axiosInstance = axios.create({
//   baseURL: 'https://tarea-1-breaking-bad.herokuapp.com/api'
// })

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, async function (req, res) {
  // res.send('Hello seasons!');
  const episodes = await req.axiosInstance.get('/episodes');
  console.log('episodes', episodes);
  // console.log("cosa prueba", req.prueba);
  res.render('seasons/index.ejs', {
    episodes: episodes.data,
  });
})

module.exports = router;
