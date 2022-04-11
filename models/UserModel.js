const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  phone: String,
  email: String,
  create_time: {type: Number, default: Date.now},
  role_id: String
});

UserSchema.plugin(passportLocalMongoose);


const UserModel = mongoose.model('User', UserSchema);

UserModel.findOne({username: 'admin'}).then(async user => {
  if (!user) {
    const {username, password, email} = {email: 'admin@qq.com', username: 'admin', password: 'admin'}
    const user = new UserModel({username, password, email});
    const registeredUser = await UserModel.register(user, password);
    console.log(registeredUser)
  }
})
module.exports = UserModel