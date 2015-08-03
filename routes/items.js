var express = require('express');
var router  = express.Router();

var Items = require('../models/items');

router.get('/', function ( req, res ) {

  Items.find(function ( err, items ) {
    if (err) return console.error(err);
    res.render( 'items', {
      items   : items,
      message : req.flash('info')
    } )
  } )

} )

router.post('/', function ( req, res ) {

  var item = new Items( {
    productCode : req.body.productCode,
    itemName    : req.body.itemName,
    price       : req.body.price,
    location    : req.body.location
  } )

  item.save( function ( err, item ) {
    if( err ) return console.error( err )
    req.flash('info', 'Item added!')
    res.redirect("/items");
  } )

} )

module.exports = router;

