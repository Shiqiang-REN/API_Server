const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/UserModel');
const Customer = require('../models/CustomerModel');

passport.use('admin-local',new LocalStrategy(User.authenticate()));
passport.use('customer-local', new LocalStrategy(Customer.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport