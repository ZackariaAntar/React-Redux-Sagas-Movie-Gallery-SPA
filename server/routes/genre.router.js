const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const genreQuery =  `SELECT * FROM genres ORDER BY name ASC;`

  pool.query(genreQuery).then((result)=>{
    console.log('GENRE GET REQUEST SUCCESS');
    res.send(result.rows)

  }).catch((err)=>{
    console.log("ERROR WITH GENRE GET", err);
    res.sendStatus(500)

  })
  // Add query to get all genres
});

module.exports = router;