var express = require('express');
// const axios = require('axios');

// const axiosInstance = axios.create({
//   baseURL: 'https://tarea-1-breaking-bad.herokuapp.com/api'
// })

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, async function (req, res) {
  // res.send('Hello seasons!');
  const ep_bcs = await req.axiosInstance.get('/episodes?series=Better+Call+Saul');
  const ep_bb = await req.axiosInstance.get('/episodes?series=Breaking+Bad');
  // console.log('episodes', episodes);
  // console.log("cosa prueba", req.prueba);
  res.render('seasons/index.ejs', {
    ep_bcs,
    ep_bb
  });
})

module.exports = router;
