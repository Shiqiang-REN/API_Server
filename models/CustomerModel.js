const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const CustomerSchema = new Schema({
  displayName: String,
  create_time: {type: Number, default: Date.now},
});

CustomerSchema.plugin(passportLocalMongoose);

const CustomerModel = mongoose.model('Customers', CustomerSchema);

module.exports = CustomerModel