const ejs = require('ejs');
const path = require('path');
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
  ejs.renderFile(path.join(__dirname,'google_new.ejs'),{name:username},function (err,data) {
  if (err) throw err;
  let mailOptions = {
    from: '"AVIT" <vaibhavbhardwaaj@gmail.com>',
    to: email,
    subject: 'New User',
    html: data
  };
  transporter.sendMail(mailOptions,(err,info)=>{
    if (err) throw err;
    console.log('goggle mail send');
  });
});
}
