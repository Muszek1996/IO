var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_dev', {   //IT'S for DEVELOPMENT ONLY
    title: 'IO APP',
    sphereSize: 25
  });
});

module.exports = router;
