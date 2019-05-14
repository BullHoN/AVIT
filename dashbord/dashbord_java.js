const socket = io.connect('/dashbord');


document.querySelector('#list-messages-list').addEventListener('click',()=>{
  if($('.main_chats').length){
    setTimeout(function () {
    const scrolldown = Array.from(document.querySelectorAll('.main_chats'));
    scrolldown.forEach((cmn)=>{
      cmn.scrollTop = cmn.scrollHeight;
    });
    }, 1000);
  }
});

const search = document.querySelector('.form-inline input[type="search"]');
const items = document.querySelector('.items .list-group');
const username = document.querySelector('#nav-tabContent .display-5').textContent;
const notshw = document.querySelector('#unique_username').textContent;
console.log(username);

if($('#send_private_message').length){
  console.log('element exist');

  socket.emit('add_user',{
    name:notshw
  });

  const send_private = document.querySelectorAll('#send_private_message');
  Array.from(send_private).forEach((sends)=>{
    sends.addEventListener('click',(e)=>{
      e.preventDefault();
      let form = Array.from(e.target.previousElementSibling.children)[0].value;
      console.log(form);
      if(form.length>0){
        console.log('clicked message send');
        const chat_room = e.target.parentElement.previousElementSibling;
        console.log(chat_room);
        // chat_room.innerHTML += '<h2 class="badge badge-pill badge-primary" style="font-size: 1.4rem;float:right;margin-right:50px;">'+form+'</h2><br><br>'
        chat_room.innerHTML += '<h2 class="bg-primary text-white messgage_edit" style="font-size: 1.4rem;float:right;margin-right:50px;"> '+form+' </h2><br><br><br>';
        chat_room.scrollTop = chat_room.scrollHeight;
        const from = Array.from(e.target.parentElement.previousElementSibling.children)[0].textContent;
        console.log(from);
        socket.emit('private_message',{
          from:from,
          message:form,
          sender:notshw
        });
        form='';
      }
    });
  });

  socket.on('private_message',(data)=>{
    const chat_rooms = Array.from(document.querySelectorAll('.main_chats'));
    chat_rooms.forEach((room)=>{
      if(Array.from(room.children)[0].innerText == data.sender){
        room.innerHTML += '<h2 class="bg-dark text-white messgage_edit" style="font-size:1.4rem;float:left;margin-left:30px;">'+ data.message +'</h2><br><br><br>';
        room.scrollTop = room.scrollHeight;
        console.log('zeher hai ye to');
      }
    });
    console.log(chat_rooms);
    console.log(data);
  });

}

$(".emogi").emojioneArea({
   pickerPosition:"top"
});

let Data;
  let time;
search.addEventListener('click',()=>{
  time=600;
  $.ajax({
    url: '/admin/users',
    type: 'GET',
    success: function (data) {
      Data = data;
    }
  });
  console.log('ajax');
});

search.addEventListener('keyup',()=>{
  items.innerHTML='';
  setTimeout(function () {
    for(let i=0;i<Data.user.length;i++){
      if(Data.user[i].username.includes(search.value) && Data.user[i].username!=notshw){
        //console.log('contain in '+ Data.user[i].username);
        if(Data.user[i].profilepick =='no link'){
           items.innerHTML += '<li class="list-group-item border"><span><img class="rounded-circle" src="/lgos.png" style="width:50px;height:50px"></span><a href="/dashbord/users/profile/'+ Data.user[i].username +'"target="_blank">'+ Data.user[i].username +'<a></li>'
        }else {
        items.innerHTML += '<li class="list-group-item border"><span><img class="rounded-circle" src="/dashbord/profilepick/'+ Data.user[i].profilepick +'" style="width:50px;height:50px"></span><a href="/dashbord/users/profile/'+ Data.user[i].username +'" target="_blank">'+ Data.user[i].username +'<a></li>'
        }
      }
    }
  }, time);
  time=0;
  console.log(search.value);
});

document.addEventListener('click',(e)=>{
  if(e.target.nodeName != 'LI'){
    items.innerHTML='';
  }
});

document.querySelector('.accept_request').addEventListener('click',(e)=>{
  const username = e.target.parentElement.textContent.split('@')[1].split(' ')[0];
  console.log(username);
  $.ajax({
    url: '/dashbord/accept_request',
    type: 'POST',
    data: {acceptedof: username},
    success:function (data) {
      console.log(data);
      window.location.href ='/dashbord/loader';
    }
  });
});
//socket
