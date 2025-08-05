const mongoose = require('mongoose');
module.exports = mongoose.model('Item', new mongoose.Schema({
id: String,
item_name: String,
description: String,
status: String,
stock_level: Number,
reorderThreshold: Number,
}));