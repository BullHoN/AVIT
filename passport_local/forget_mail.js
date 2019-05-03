const ejs = require('ejs');
const path = require('path');
module.exports = function (nodemailer,email,username,password) {
  let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user: 'vaibhavbhardwaaj@gmail.com',
      pass: '1310avk@physics'
    }
  });
  ejs.renderFile(path.join(__dirname,'forget.ejs'),{name:username,password:password},function (err,data) {
  if (err) throw err;
  let mailOptions = {
    from: '"AVIT" <vaibhavbhardwaaj@gmail.com>',
    to: email,
    subject: 'Email verification',
    html: data
  };
  transporter.sendMail(mailOptions,(err,info)=>{
    if (err) throw err;
    console.log('forget mail send');
  });
});
}
