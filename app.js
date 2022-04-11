//create server
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

//Mongodb
mongoose.connect('mongodb+srv://admin:pFDRwVIyhua7pyZ9@cluster0.4ueqo.mongodb.net/bootcamp_project?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//session
const session = require('express-session');
const flash = require('connect-flash');
const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig))
app.use(flash())

//request para
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middlewares
const passport = require ('./config/passport')

//authentication(passport package)
app.use(passport.initialize());
app.use(passport.session());

//routers
const adminSysUsersRoutes = require('./routes/adminSysUsers');


//jwt
const jwt = require('jsonwebtoken');
const {isLoggedIn, verifyToken} = require('./middlewares/authUser');

//routes
app.use('/', verifyToken, isLoggedIn, adminSysUsersRoutes);


app.get('/home',(req,res)=>{
  res.send('home1')
});

app.post('/register',async (req, res) => {
  const {email, username, password} = req.body;
  const user = new User({email, username});
  const registeredUser = await User.register(user, password);
  const token = jwt.sign({id: registeredUser.id}, 'PRIVATE_KEY', { expiresIn: '7 days' });
  console.log(token)
  res.send('home')
});








//listing the port
app.listen(5001,()=>{
  console.log("Serving at port 5001");
});