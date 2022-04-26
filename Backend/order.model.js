const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    uid: { type: String, required: true},
    items: { type: String, required: true},
    totalPrice: { type: Number, required: true},
    date: { type: String, required: true}
},  {collection: 'orders'});

mongoose.model('order', orderSchema);