const NUM_HEARTS = 20;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const hearts = []

const randomNum = (min, max) => {
  let randomInt = Math.floor((Math.random() * (max-min)) + min);
  
  return randomInt;
}

let n = 0
setInterval(() => {
  if (hearts.length > NUM_HEARTS) {
    document.body.removeChild(hearts[0]);
    hearts.shift();
  }
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.top = `${randomNum(0, HEIGHT-130)}px`;
  heart.style.left = `${randomNum(0, WIDTH-140)}px`;
  heart.style.transform = `rotate(${randomNum(-15, 15)}deg)`
  hearts.push(heart);
  document.body.appendChild(hearts[hearts.length-1]);
}, 300);

///
/// Rømmende knapp
///
let mousePos = { x: 0, y: 0 };
let noBtn = document.querySelector('#no-btn');
let noBtnPos = { x: noBtn.getBoundingClientRect().x, y: noBtn.getBoundingClientRect().y };
let noBtnSize = { w: noBtn.getBoundingClientRect().width, h: noBtn.getBoundingClientRect().height };

document.addEventListener('mousemove', ev => {
  mousePos.x = ev.clientX;
  mousePos.y = ev.clientY;
})

setInterval(() => {
  let dst = Math.hypot((noBtnPos.y + noBtnSize.h/2) - mousePos.y, (noBtnPos.x + noBtnSize.w/2) - mousePos.x);
  if (dst > noBtnSize.w*1.5) return;

  let angle = Math.atan2((noBtnPos.y + noBtnSize.h/2) - mousePos.y, (noBtnPos.x + noBtnSize.w/2) - mousePos.x)
  let speed = { x: (noBtnSize.w*1.5 - dst)/2*Math.cos(angle), y: (noBtnSize.w*1.5-dst)/2*Math.sin(angle) };

  noBtn.style.left = ((parseInt(noBtn.style.left) || 0) + speed.x) + 'px';
  noBtn.style.top = ((parseInt(noBtn.style.top) || 0) + speed.y) + 'px';

  noBtnPos = { x: noBtn.getBoundingClientRect().x, y: noBtn.getBoundingClientRect().y };
}, 1000/15)

addEventListener('resize', (ev) => {
  noBtnPos = { x: noBtn.getBoundingClientRect().x, y: noBtn.getBoundingClientRect().y };
  noBtnSize = { w: noBtn.getBoundingClientRect().width, h: noBtn.getBoundingClientRect().height };
})