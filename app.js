//create server
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Mongodb
mongoose.connect('mongodb+srv://eshop:vwIDBe8RmGD3fvWX@cluster0.4ueqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//static files
app.use(express.static('public'))

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

//CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'content-type, authorization, accept');
  res.set('Access-Control-Max-Age', 86400);
  if (req.method.toLowerCase() === 'options') {
    return res.end();
  }
  next();
});

//middlewares
const passport = require ('./config/passport')

//authentication(passport package)
app.use(passport.initialize());
app.use(passport.session());

//routers
//admin dashboard
const adminSysUsersRoutes = require('./routes/adminSysUsers');
const RolesRoutes = require('./routes/roles');
const ProductsRoutes = require('./routes/products');
const CategoriesRoutes = require('./routes/categories');
const UploadImgRoutes = require('./routes/uploadImg');
const RolesRouter = require('./routes/roles');
//customer website
const CustomersRoutes = require('./routes/customers')

//jwt
const jwt = require('jsonwebtoken');
const {verifyToken, customerIsLoggedIn, adminIsLoggedIn} = require('./middlewares/authUser');

//routes
//admin dashboard
app.use('/adminUsers',adminIsLoggedIn, adminSysUsersRoutes);
app.use('/manage/roles', verifyToken, RolesRoutes);
app.use('/manage/users', verifyToken, adminSysUsersRoutes);
app.use('/manage/img', verifyToken, UploadImgRoutes);
//customer website
app.use('/customers', customerIsLoggedIn, CustomersRoutes);
app.use('/register', CustomersRoutes);

app.use('/products',  ProductsRoutes);
app.use('/categories', CategoriesRoutes);
app.get('/test', function (req, res) {
  console.log('[test ok port 5000]')
  res.send({
    code: 0,
    data: 'hello react test'
  })
})

//listing the port
app.listen(5002,()=>{
  console.log("Serving at port 5000");
  console.log("ok");

});
