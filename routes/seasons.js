var express = require('express');


const router = express.Router()

// Funciones de utilidad
function orderSerieBySeasons(serieObj) {
  const orderedObj = {};

  serieObj.forEach((ep) => {
    // Crea la entrada si no existe
    if (orderedObj[ep.season] === undefined) {
      orderedObj[ep.season] = [];
    }
    // Añádelo a la lista
    orderedObj[ep.season].push(ep);
  });

  const returnObjList = [];
  Object.keys(orderedObj).forEach((season_num) => {
    const season_eps = orderedObj[season_num]
    const subObj = {
      season_num,
      season_eps
    }
    returnObjList.push(subObj);
  });


  console.log('orderedObj', returnObjList);
  return returnObjList

}

// Todas las rutas de esta categoría
router.get(`/`, async function (req, res) {
  // res.send('Hello seasons!');
  const ep_bcs = await req.axiosInstance.get('/episodes?series=Better+Call+Saul');
  const ep_bb = await req.axiosInstance.get('/episodes?series=Breaking+Bad');

  const seasons_bb = orderSerieBySeasons(ep_bb);
  const seasons_bcs = orderSerieBySeasons(ep_bcs);
  // console.log('episodes', episodes);
  // console.log("cosa prueba", req.prueba);
  res.render('seasons/index.ejs', {
    seasons_bcs,
    seasons_bb,
  });
})

module.exports = router;
