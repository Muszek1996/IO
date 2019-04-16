var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'IO APP',
    sphereSize: 25
  });
});

module.exports = router;
