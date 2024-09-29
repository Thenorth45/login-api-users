require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const myMiddleware = require('./middlewares/myMiddleware');

const {register, login, refresh } = require("./Controllers/AuthController");

const {getUsers, deleteUser, getUser, updateUser, addboxer} = require('./Controllers/UserController');

const { addcamp, getcamp } = require('./Controllers/CampController');

const {addtraining, getTraining} = require('./Controllers/TrainingController');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.error("Could not connect to MongoDB", err));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use("/register", register);
app.use("/login", login);
app.use("/refresh", refresh);
app.use('/users', getUsers);
app.use('/getuser/:id', getUser);

app.use("/getcamp", getcamp);
app.use('/gettraining', getTraining);

app.use('/addtraining', addtraining);
app.use("/addcamp", addcamp);
app.use("/addboxer", addboxer);

app.use('/updateuser/:id', updateUser);
app.use('/deleteuser/:id', deleteUser);
app.use(myMiddleware);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
