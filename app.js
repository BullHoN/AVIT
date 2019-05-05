const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const Session = require('express-session');
require('./passport_local/user_config').passport(passport);
const passportSetup = require('./passport_goggle/config_goggle');
const facebooksetup = require('./passport_facebook/facebook_config');
mongoose.Promise = global.Promise;
//connection to mongo Atlas
mongoose.connect('mongodb+srv://MissKaur:U0UGU9qcGQ5bAoyu@avit-iur2h.mongodb.net/test?retryWrites=true',{useNewUrlParser:true})
.catch((err)=>console.log(err));

//session
app.use(Session({
  secret: 'ZEHER',
  resave: true,
  saveUninitialized: true
}));
//passport middlewares
app.use(passport.initialize());
app.use(passport.session());
//middlewares
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use('/',express.static('home'));

//passport route
app.use('/oauth',require('./passport_facebook/facebook_routes'));
app.use('/oauth',require('./passport_goggle/goggle_route'));
app.use('/',require('./passport_local/route_users'));
//routes
app.get('/',(req,res)=>{
  res.render('home');
})
//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log('server running');
});
