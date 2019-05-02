const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connection to mongo Atlas
mongoose.connect('mongodb+srv://MissKaur:U0UGU9qcGQ5bAoyu@avit-iur2h.mongodb.net/test?retryWrites=true',{useNewUrlParser:true})
.catch((err)=>console.log(err));
//middlewares
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use('/',express.static('home'));

//passport route
app.use('/',require('./passport_local/route_users'));
//routes
app.get('/',(req,res)=>{
  res.render('home');
})
//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT);
