// 가이드 화면
const guideDiv = document.querySelector('.guideDiv');
const guideOne = document.querySelector('#guideOne');
const guideTwo = document.querySelector('#guideTwo');
const guideThree = document.querySelector('#guideThree');

guideTwo.style.visibility = 'hidden';
guideThree.style.visibility = 'hidden';

guideDiv.addEventListener('click', guide3)

let touchCnt = 0;

function guide1() {
  touchCnt += 1;
  console.log('touchCnt', touchCnt);
  guideOne.style.display = 'none';
  guideTwo.style.visibility = 'visible';
}

const guide2= ()=>{
    guide1();
    guideTwo.style.visibility = 'hidden';
    guideThree.style.visibility = 'visible';
}
const guide3()=> {
    guide2()
  guideThree.style.display = 'hidden';
  guideDiv.style.display = 'none';
}
