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
//form validation
