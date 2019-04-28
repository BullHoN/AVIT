const express = require('express');
const app = express();


//middlewares
app.set('view engine','ejs');
app.use('/',express.static('home'));

//routes
app.get('/',(req,res)=>{
  res.render('home');
})
//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT);
