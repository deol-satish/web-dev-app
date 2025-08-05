const mongoose = require('mongoose');
module.exports = mongoose.model('SupplierOrder', new mongoose.Schema({
orderid: String,
itemid: String,
quantity: Number,
status: String,
deliveryDate:String
}));