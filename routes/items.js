var express = require('express');
var router  = express.Router();
var session;

var Items = require('../models/items');

router.get('/', function ( req, res ) {
  session = req.session;
  if ( !session.username ) {
    res.redirect('/login')
    return;
  }
  Items.where('user', session.username).find(function ( err, items ) {
    if (err) return console.error(err);
    res.render( 'items', {
      items   : items,
      message : req.flash('info'),
      user    : session.username
    } )
  } )

} )

router.post('/', function ( req, res ) {
  session = req.session;

  var item = new Items( {
    productCode : req.body.productCode,
    itemName    : req.body.itemName,
    price       : req.body.price,
    location    : req.body.location,
    user        : session.username
  } )

  if ( !item.productCode || !item.itemName || !item.price || !item.location ) {
    req.flash( 'info', 'Please fill out missing field.' );
    res.redirect("/items");
    return;
  }

  item.save( function ( err, item ) {
    if( err ) return console.error( err )
    req.flash('info', 'Item added!')
    res.redirect("/items");
  } )

} )

module.exports = router;

