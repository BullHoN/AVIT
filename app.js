const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const Session = require('express-session');
require('./passport_local/user_config').passport(passport);
const passportSetup = require('./passport_goggle/config_goggle');
const facebooksetup = require('./passport_facebook/facebook_config');
const methodOverride = require('method-override');
const socket = require('socket.io');

mongoose.Promise = global.Promise;
//connection to mongo Atlas
// let mongoURI = 'mongodb+srv://MissKaur:U0UGU9qcGQ5bAoyu@avit-iur2h.mongodb.net/test?retryWrites=true';
// const conn = mongoose.createConnection(mongoURI, {useNewUrlParser: true });
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
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use('/',express.static('dashbord'));
app.use('/',express.static('home'));
app.use('/',express.static('other_profile'));

//passport route
app.use('/oauth',require('./passport_facebook/facebook_routes'));
app.use('/oauth',require('./passport_goggle/goggle_route'));
app.use('/',require('./image_upload/route_image'));
app.use('/',require('./image_upload/profile_user'));
app.use('/',require('./image_upload/profile_images'));
app.use('/',require('./search_friends/search'));
app.use('/',require('./add_friend/add_friend_route'));
app.use('/',require('./passport_local/route_users'));
//routes
app.get('/',(req,res)=>{
  res.render('home');
});

//listen
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
  console.log('server running');
});

//socket setup

const io = socket(server);

const nsp = io.of('/dashbord');

let users = [];

const User = require('./oauth_models/local_model');

nsp.on('connection',function (socket) {
  console.log('someone is connected hello my name is alana phana');


  socket.on('private_message',(data)=>{
    let flag=true;
    console.log('hello i falied');
    User.findOne({username:data.from}).then((user1)=>{
      let user_exist = false;
      user1.messages.forEach((user12)=>{
         if(user12.with == data.sender){
           user12.messages.push({message:data.message,isUser:false});
           console.log('message exist');
           user_exist=true;
           user1.save().then(()=>console.log('message is pussed')).catch((err)=>console.log(err));
         }
      });
      if(!user_exist){
        const message = [{
          message:data.message,
          isUser:false
        }];
        user1.messages.push({with:data.sender,messages:message});
        console.log('new message');
        user1.save().then(()=>console.log('message saved')).catch((err)=>console.log(err));
      }
    });
    User.findOne({username:data.sender}).then((user1)=>{
      let user_exist = false;
      user1.messages.forEach((user12)=>{
         if(user12.with == data.from){
           user12.messages.push({message:data.message,isUser:true});
           console.log('message exist');
           user_exist=true;
           user1.save().then(()=>console.log('message is pussed')).catch((err)=>console.log(err));
         }
      });
      if(!user_exist){
        const message = [{
          message:data.message,
          isUser:true
        }];
        user1.messages.push({with:data.from,messages:message});
        console.log('new message');
        user1.save().then(()=>console.log('message saved')).catch((err)=>console.log(err));
      }
    });
    users.forEach((user)=>{
      if(user.username == data.from){
        console.log('user is online message send' + data.message);
        nsp.to(user.id).emit('private_message',data);
        flag=false;
      }
    });
    if(flag){
      console.log('user is not online');
    }
  });

  socket.on('add_user',(data)=>{
    users.push({username:data.name,id:socket.id});
    console.log(users);
  });

  socket.on('disconnect',()=>{
    users.forEach((user,index)=>{
      if(user.id == socket.id){
        users.splice(index,1);
      }
    });
    console.log(users);
    console.log('user disconneted');
  });
});
