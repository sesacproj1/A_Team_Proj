// 가이드 화면
const guideDiv = document.querySelector('.guideDiv');
const guideOne = document.querySelector('#guideOne');
const guideTwo = document.querySelector('#guideTwo');
const guideThree = document.querySelector('#guideThree');
const guideOneBubble = document.querySelector('#guideBubbleOne');
const guideTwoBubble = document.querySelector('#guideBubbleTwo');
const guideThreeBubble = document.querySelector('#guideBubbleThree');

// 1. 순서대로 가이드 보여주기
guideTwo.style.visibility = 'hidden';
guideThree.style.visibility = 'hidden';

let touchCnt = 0;
guideDiv.addEventListener('click', () => {
  touchCnt += 1;
  console.log('touchCnt', touchCnt);

  switch (touchCnt) {
    case 1:
      console.log('switch', touchCnt);
      guideOne.style.display = 'none';
      guideTwo.style.visibility = 'visible';
      break;

    case 2:
      guideTwo.style.visibility = 'hidden';
      guideThree.style.visibility = 'visible';
      break;

    case 3:
      guideThree.style.display = 'hidden';
      guideDiv.style.display = 'none';
      break;
  }
});
