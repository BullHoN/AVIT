const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require('express');
const route = express.Router();
const {ensureAuthentication} = require('../passport_local/auth_local');
const User = require('../oauth_models/local_model');
mongoose.Promise = global.Promise;


let mongoURI = 'mongodb+srv://MissKaur:U0UGU9qcGQ5bAoyu@avit-iur2h.mongodb.net/test?retryWrites=true';
const conn = mongoose.createConnection(mongoURI, {useNewUrlParser: true });

let gfs;
conn.once('open',()=>{
  gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('user_cover');
});

//storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log(req.user);
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'user_cover'
        };
        User.findOne({username:req.user.username}).then((user)=>{
          if(user){
            if(user.coverphoto.url != 'no link'){
              gfs.remove({filename:user.coverphoto.url,root: 'user_cover'},(err,gridStore)=>{
                if (err) throw err;
                 console.log('file removed');
                 user.coverphoto.url = filename;
                 console.log(filename);
                 user.save().catch((err)=>console.log(err));
              });
            }else {
              user.coverphoto.url = filename;
              user.save().catch((err)=>console.log(err));
            }
          }
        }).catch((err)=>console.log(err));
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
   storage:storage,
   fileFilter: function (req,file,cb) {
     checkFileType(file,cb);
   }
  });

 function checkFileType(file,cb) {
   const filetypes = /jpeg|jpg|png|gif/;

   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

   const memtype = filetypes.test(file.mimetype);

   if(extname && memtype){
     return cb(null,true);
   }else {
     cb('Error: Images Only');
   }
 }


route.post('/post/image',upload.single('user_cover'),(req,res)=>{
  //res.json({file:req.file});
  res.render('loader');
});

route.get('/dashbord/image/:filename',(req,res)=>{
   gfs.files.findOne({filename:req.params.filename},(err,file)=>{
     console.log(file);
     if(file == null){
         res.json({
           err: 'no file exist'
         });
     }
     else {
       if(file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType === 'image/jpeg'){
         //read stream
         const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
       }else {
         res.json({err: 'not an image'});
       }
     }
   });
});

module.exports = route;
