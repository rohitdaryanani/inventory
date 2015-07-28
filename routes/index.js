var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('index', {
  	title   : 'Inventory',
  	version : 1.0
  });
});

module.exports = router;
