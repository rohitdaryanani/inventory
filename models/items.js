var mongoose  = require('mongoose');

var itemSchema = mongoose.Schema( {
  'productCode' : String,
  'itemName'    : String,
  'price'       : Number,
  'location'    : String
} )

var Items = mongoose.model( 'Items', itemSchema );

module.exports = Items;
