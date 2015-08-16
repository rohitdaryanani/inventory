var express = require('express');
var router  = express.Router();
var session;

var Items = require('../models/items');

router.get('/', function ( req, res ) {
  session = req.session;
  console.log(session.username);
  if ( !session.username ) {
    res.redirect('/login')
    return;
  }
  Items.find(function ( err, items ) {
    if (err) return console.error(err);
    res.render( 'items', {
      items   : items,
      message : req.flash('info'),
      user    : session.username
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

