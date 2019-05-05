window.onscroll = () => {
  const nav = document.querySelector('nav');
  if(this.scrollY <= 570) nav.id = ''; else nav.id = 'scrol';
  if(this.scrollY <=570){
  Array.from(document.querySelectorAll('.navbar-nav a'))[0].classList.add('active');
  for(let i=1;i<Array.from(document.querySelectorAll('.navbar-nav a')).length;i++){
    Array.from(document.querySelectorAll('.navbar-nav a'))[i].classList.remove('active');
  }
}else if(this.scrollY<=2200) {
  Array.from(document.querySelectorAll('.navbar-nav a'))[1].classList.add('active');
  for(let i=0;i<Array.from(document.querySelectorAll('.navbar-nav a')).length;i++){
    if(i!=1)
    Array.from(document.querySelectorAll('.navbar-nav a'))[i].classList.remove('active');
  }
}
else if(this.scrollY<=2500){
  Array.from(document.querySelectorAll('.navbar-nav a'))[2].classList.add('active');
  for(let i=0;i<Array.from(document.querySelectorAll('.navbar-nav a')).length;i++){
    if(i!=2)
    Array.from(document.querySelectorAll('.navbar-nav a'))[i].classList.remove('active');
}
}else {
  Array.from(document.querySelectorAll('.navbar-nav a'))[3].classList.add('active');
  for(let i=0;i<Array.from(document.querySelectorAll('.navbar-nav a')).length;i++){
    if(i!=3)
    Array.from(document.querySelectorAll('.navbar-nav a'))[i].classList.remove('active');
}
}
};
document.querySelector('.parallax').addEventListener('click',(evnt)=>{
  if(evnt.target.nodeName =='BUTTON'){
    if(evnt.target.textContent == 'Already a User'){
      document.querySelector('#nav_login').classList.add('show');
      document.querySelector('#nav_login').classList.add('active');
      document.querySelector('#modal_Login_active').classList.add('active');
    }else {
      document.querySelector('#nav_register').classList.add('show');
      document.querySelector('#nav_register').classList.add('active');
      document.querySelector('#modal_register_active').classList.add('active');
    }
  }
});
$('#login_modal').on('hidden.bs.modal',()=>{
  document.querySelector('#modal_Login_active').classList.remove('active');
  document.querySelector('#modal_register_active').classList.remove('active');
  document.querySelector('#nav_login').classList.remove('show');
  document.querySelector('#nav_login').classList.remove('active');
  document.querySelector('#nav_register').classList.remove('show');
  document.querySelector('#nav_register').classList.remove('active');
});
document.querySelector('#added').addEventListener('click',()=>{
  if(document.querySelector('#hode').value == 'Avneet Kaur'){
    if(document.getElementById('tribute1').style.display == 'inline-block'){
      document.getElementById('tribute1').style.display = 'none';
      document.getElementById('tribute2').style.display = 'none';
    }else {
      document.getElementById('tribute1').style.display = 'inline-block';
      document.getElementById('tribute2').style.display = 'inline-block';
    }
  }
});
//loader
function loader(){
  document.querySelector('.loader').style.display ='none';
  for(let i=0;i<Array.from(document.querySelectorAll('.shw')).length;i++){
    if(i==0)
    Array.from(document.querySelectorAll('.shw'))[0].style.display='flex';
    else {
    Array.from(document.querySelectorAll('.shw'))[i].style.display='block'
    }
  }
}
//form validation register(pqssword)
const password=Array.from(document.querySelectorAll('#nav_register input[type=password]'));

let check = false,check_short=false;
password.forEach((pass)=>{
  pass.addEventListener('keyup',()=>{
    if(document.querySelectorAll('#nav_register input[type=password]')[0].value.length<6 && document.querySelectorAll('#nav_register input[type=password]')[0].value!=''){
      document.querySelector('#nav_register #not_match1').style.display = 'block';
      document.querySelector('#nav_register #not_match1').textContent = 'Too short password';
      document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '2px solid #ff3333';
      check_short=false;
    }else{
      if (document.querySelectorAll('#nav_register input[type=password]')[0].value!='') {
        document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '2px solid green';
      }
      else
      document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '1px solid #cccccc';
      document.querySelector('#nav_register #not_match1').style.display = 'none';
      check_short=true;
    }
    if (check_short==true) {
      if(password[0].value == password[1].value && password[1].value!='' && password[0].value!=''){
      document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '2px solid green';
      document.querySelectorAll('#nav_register input[type=password]')[1].style.border = '2px solid green';
      if(username_check && email_check)
      check=true;
      document.querySelector('#nav_register #not_match').style.display = 'none';
    }else if (password[1].value!='' && password[0].value!='' && password[1].value!='') {
      document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '2px solid #ff3333';
      document.querySelectorAll('#nav_register input[type=password]')[1].style.border = '2px solid #ff3333';
      document.querySelector('#nav_register #not_match').style.display = 'block';

      check = false;
    }else if (password[1].value=='' && password[0].value=='') {
      document.querySelectorAll('#nav_register input[type=password]')[0].style.border = '1px solid #cccccc';
      document.querySelectorAll('#nav_register input[type=password]')[1].style.border = '1px solid #cccccc';
      check = false;
      document.querySelector('#nav_register #not_match').style.display = 'none';
    }
    }
  });
});
//username
let username_check=false,usr_name='',time_user=5000;
document.querySelector('#nav_register input[type=text]').addEventListener('keyup',()=>{
  time_user=5000;
  if(document.querySelector('#nav_register input[type=text]').value.length>5 && document.querySelector('#nav_register input[type=text]').value!=usr_name){
    document.querySelector('#nav_register .input-group-append').style.display = 'inline';
    usr_name = document.querySelector('#nav_register input[type=text]').value;
    document.querySelector('#nav_register #user_name').style.display = 'none';
  setTimeout(function () {
    $('form input[type="text"]').prop("disabled", true);
    $.ajax({
      type: 'POST',
      url: '/',
      data:{check:'username',username:document.querySelector('#nav_register input[type=text]').value},
      success:function(data) {
        if (data.status) {
          username_check=true;
          check_all();
          document.querySelector('#nav_register input[type=text]').style.border = '2px solid green';
          $('form input[type="text"]').prop("disabled", false);
          document.querySelector('#nav_register #user_name').style.display = 'block';
          document.querySelector('#nav_register #user_name').style.color = 'green';
          document.querySelector('#nav_register #user_name').textContent = 'Name is available';
          console.log('username is avilable');
          document.querySelector('#nav_register .input-group-append').style.display = 'none';
        }else {
          username_check=false;
          check_all();
          document.querySelector('#nav_register input[type=text]').style.border = '2px solid #ff3333';
          $('form input[type="text"]').prop("disabled", false);
          document.querySelector('#nav_register #user_name').style.display = 'block';
          document.querySelector('#nav_register #user_name').style.color = 'red';
          document.querySelector('#nav_register #user_name').textContent = 'Name not is available';
          document.querySelector('#nav_register .input-group-append').style.display = 'none';
          console.log('username not avilable');
        }
      }
    });
  }, time_user);
}else if(username_check==false){
  if(document.querySelector('#nav_register input[type=text]').value==''){
    document.querySelector('#nav_register #user_name').style.display = 'none';
    document.querySelector('#nav_register input[type=text]').style.border = '1px solid #cccccc';
  }
  else {
    document.querySelector('#nav_register input[type=text]').style.border = '2px solid #ff3333';
    document.querySelector('#nav_register #user_name').style.display = 'block';
    document.querySelector('#nav_register #user_name').style.color = 'red';
    document.querySelector('#nav_register #user_name').textContent = 'too short';
  }
}
});
//email verification
let email_check=false,email_wait=4000;
document.querySelector('#nav_register input[type=email]').addEventListener('keyup',()=>{
  if(document.querySelector('#nav_register input[type=email]').value.includes('@') && document.querySelector('#nav_register input[type=email]').value.includes('.com')){
    email_wait=4000;
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: '/',
        data:{check:'email',email:document.querySelector('#nav_register input[type=email]').value},
        success:function(data) {
          if (data.status) {
            document.querySelector('#nav_register input[type=email]').style.border = '2px solid green';
            document.querySelector('#user_email').style.display = 'none';
            email_check=true;
            check_all();
            console.log('email is new');
          }else {
            document.querySelector('#nav_register input[type=email]').style.border = '2px solid #ff3333';
            document.querySelector('#user_email').style.display = 'block';
            document.querySelector('#user_email').textContent = 'Already registered';
            email_check=false;
            check_all();
            console.log('email already Register');
          }
        }
      });
    }, email_wait);
  }
  if(document.querySelector('#nav_register input[type=email]').value==''){
    document.querySelector('#nav_register input[type=email]').style.border = '1px solid #cccccc';
  }
});

  //submit
  function check_all(){
    if(username_check && email_check){
      check=true;
    }else {
      check=false;
    }
}
  document.querySelector('#nav_register').addEventListener('submit',function(evnt) {
  if(check){
    evnt.preventDefault();
    const email = document.querySelector('#nav_register input[type=email]').value;
    const username = document.querySelector('#nav_register input[type=text]').value;
    const send_password = document.querySelectorAll('#nav_register input[type=password]')[0].value;
    $.ajax({
      type: 'POST',
      url: '/',
      data:{email:email,username:username,password:send_password},
      success:function(data) {
        if (data.status) {
          document.querySelector('.new_user').style.display ='block';
          $('#nav_register input[type="text"]').prop("disabled", true);
          $('#nav_register input[type="email"]').prop("disabled", true);
          $('#nav_register input[type="password"]').prop("disabled", true);
          console.log('its new user');
        }else {
          console.log('existing user');
        }
      }
    });
  }else {
    evnt.preventDefault();
  }
});
//login form
let login_email_check=false;
document.querySelector('#nav_login input[type=email]').addEventListener('keyup',()=>{
  if(document.querySelector('#nav_login input[type=email]').value.includes('@') && document.querySelector('#nav_login input[type=email]').value.includes('.com')){
    email_wait=4000;
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: '/',
        data:{check:'email',email:document.querySelector('#nav_login input[type=email]').value},
        success:function(data) {
          if (data.status) {
            document.querySelector('#nav_login input[type=email]').style.border = '2px solid #ff3333';
            document.querySelector('#login_email').style.display = 'block';
            document.querySelector('#login_email').textContent = 'Not registered';
            login_email_check=false;
            console.log('email is new so dont login');
          }else {
            document.querySelector('#nav_login input[type=email]').style.border = '2px solid green';
            document.querySelector('#login_email').style.display = 'none';
            login_email_check=true;
            console.log('email already Register can login');
          }
        }
      });
    }, email_wait);
  }
});
//login submit
document.querySelector('#nav_login').addEventListener('submit',function(evnt) {
if(login_email_check){
  evnt.preventDefault();
  const email = document.querySelector('#nav_login input[type=email]').value;
  const password = document.querySelector('#nav_login input[type=password]').value;
  $.ajax({
    type: 'POST',
    url: '/login',
    data:{email:email,password:password},
    success:function (data) {
      if(!data.status){
        if(data.mssg == 'email not verified'){
          document.querySelector('#wrong_user').style.display = 'block';
          document.querySelector('#wrong_user').innerHTML = '<span>email is not verified <a href="/zalzera" style="color:grey" id="verfiy_again">Verify now</a></span>';
          //send mail again
          document.querySelector('#verfiy_again').addEventListener('click',(evnt)=>{
            evnt.preventDefault();
            const email = document.querySelector('#nav_login input[type=email]').value;
            $.ajax({
              type: 'POST',
              url: '/zalzera',
              data:{email:email,username:email}
            });
            document.querySelector('#email_send').style.display = 'block';
            document.querySelector('#email_send').textContent = 'email has send redirecting to homepage';
            setTimeout(function () {
              window.location.href = "/";
            }, 2000);
          });
        }else {
          document.querySelector('#wrong_user').style.display = 'block';
          document.querySelector('#wrong_user').textContent = 'wrong password';
        }
      }else {
        window.location.href = "/dashbord";
      }
    }
  });
}else {
  evnt.preventDefault();
}
});
//forget password
document.querySelector('#forget_password').addEventListener('click',(evnt)=>{
  evnt.preventDefault();
  document.querySelector('#nav_login label[for=Password]').textContent = 'Enter new password';
  document.querySelector('#modal_Login_active').textContent = 'forget password';
  document.querySelector('#send_mail').style.display = 'inline-block';
  document.querySelector('#nav_login button[type=submit]').style.display = 'none';
  document.querySelector('#forget_password').textContent = '';
  document.querySelector('#login_password').textContent = 'Login?';
  document.querySelector('#login_password').style.display = 'block';
});
document.querySelector('#send_mail').addEventListener('click',(evnt)=>{
  const email = document.querySelector('#nav_login input[type=email]').value;
  const password = document.querySelector('#nav_login input[type=password]').value;
  evnt.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/forget',
    data:{email:email,password:password},
    success:function (data) {
      if(data.status == 'email send'){
        document.querySelector('#email_send').textContent = 'password has changed';
        document.querySelector('#email_send').style.color = 'green';
        document.querySelector('#email_send').style.display = 'block';
        setTimeout(function () {
          window.location.href = "/";
        }, 2000);
      }
    }
  });
});
document.querySelector('#login_password').addEventListener('click',(evnt)=>{
  evnt.preventDefault();
  document.querySelector('#nav_login label[for=Password]').textContent = 'Enter password';
  document.querySelector('#modal_Login_active').textContent = 'Login';
  document.querySelector('#nav_login button[type=submit]').style.display = 'block';
  document.querySelector('#forget_password').style.display = 'block';
  document.querySelector('#send_mail').style.display = 'none';
  document.querySelector('#forget_password').textContent = 'Forget password?';
  document.querySelector('#login_password').style.display = 'none';
  document.querySelector('#login_password').textContent = '';
});
