const User = require('./modal_user');
const ejs = require('ejs');
const path = require('path');
const randomstring = require('randomstring');
const value = randomstring.generate({
  charset:'alphanumeric'
});
module.exports = function (nodemailer,email,username) {
  let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user: 'vaibhavbhardwaaj@gmail.com',
      pass: '1310avk@physics'
    }
  });
  let name2 = email.split('@');
  let source = name2[1].split('.');
  ejs.renderFile(path.join(__dirname,'new_user_mail.ejs'),{name:username,value:value,name2:name2[0],source:source[0]},function (err,data) {
  if (err) throw err;
  let mailOptions = {
    from: '"AVIT" <vaibhavbhardwaaj@gmail.com>',
    to: email,
    subject: 'Email verification',
    html: data
  };
  transporter.sendMail(mailOptions,(err,info)=>{
    if (err) throw err;
    User.findOne({email:email}).then((user)=>{
      user.verfiy_url = value;
      user.save().catch((err)=> {if (err) throw err;});
    }).catch((err)=> {if (err) throw err;});
  });
});
}
