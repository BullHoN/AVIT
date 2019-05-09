document.querySelector('#discuss').addEventListener('mouseover',()=>{
  document.querySelector('#list-discuss-list').style.border = '2px solid yellow';
  console.log('work');
});

document.querySelector('#discuss').addEventListener('mouseleave',()=>{
  document.querySelector('#list-discuss-list').style.border = 'none';
  document.querySelector('#list-discuss-list').style.borderLeft = '10px solid blue';
});

document.querySelector('#events').addEventListener('mouseover',()=>{
  document.querySelector('#list-events-list').style.border = '2px solid yellow';
  console.log('work');
});

document.querySelector('#events').addEventListener('mouseleave',()=>{
  document.querySelector('#list-events-list').style.border = 'none';
  document.querySelector('#list-events-list').style.borderLeft = '10px solid blue';
});

document.querySelector('#chat').addEventListener('mouseover',()=>{
  document.querySelector('#list-messages-list').style.border = '2px solid yellow';
  console.log('work');
});

document.querySelector('#chat').addEventListener('mouseleave',()=>{
  document.querySelector('#list-messages-list').style.border = 'none';
  document.querySelector('#list-messages-list').style.borderLeft = '10px solid blue';
});

document.querySelector('#media').addEventListener('mouseover',()=>{
  document.querySelector('#list-videos-list').style.border = '2px solid yellow';
  document.querySelector('#list-images-list').style.border = '2px solid yellow';
  console.log('work');
});

document.querySelector('#media').addEventListener('mouseleave',()=>{
  document.querySelector('#list-videos-list').style.border = 'none';
  document.querySelector('#list-images-list').style.border = 'none';
  document.querySelector('#list-videos-list').style.borderLeft = '10px solid blue';
  document.querySelector('#list-images-list').style.borderLeft = '10px solid blue';
});
