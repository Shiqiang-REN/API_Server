const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  phone: String,
  email: String,
  create_time: {type: Number, default: Date.now},
  role_id: String
});

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', UserSchema);

UserModel.findOne({username: 'admin'}).then(async user => {
  if (!user) {
    const {username, password, email, role_id} = {email: 'admin@qq.com', username: 'admin', password: 'admin', role_id: '624b8127b91a0cebfe5f55ac'}
    const user = new UserModel({username, email, role_id});
    const registeredUser = await UserModel.register(user, password);
  }
})
module.exports = UserModel