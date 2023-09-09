const myWidth = window.innerWidth;
const myHeight = window.innerHeight;

// star position /size 정의
for (let i = 1; i <= 9; i++) {
  const star = document.querySelector(`.star${i}`);
  console.log(`star: ${star}`);
  if (i % 2 == 0) {
    // 짝수 별이라면
    star.style.top = myHeight / 2 + "px";
    star.style.left = ((1 * myWidth) / 11) * i + "px";
    console.log("star.style.top", i, star.style.top);
    console.log(i, star.style.left);
  } else {
    star.style.top = myHeight / 5 + "px";
    star.style.left = (myWidth / 11) * i + "px";
    console.log("star.style.top", i, star.style.top);
    console.log(i, star.style.left);
  }
  //star size : 퍼센트로 고치기
  star.style.width = myWidth / 10 + "px";
  star.style.height = myHeight / 10 + "px";
  console.log(star.style.width);
}

// 별자리 애니메이션
const stStar = document.querySelector("#stStar");
console.log("stStar.style.top ", stStar.style.top);
console.log("stStar ", stStar);

function stStarFall() {
  stStar.style.top += 50 + "px";
  stStar.style.left += 50 + "px";
}

setInterval(stStarFall, 1000);
