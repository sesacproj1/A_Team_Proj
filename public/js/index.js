const myWidth = window.innerWidth;
const myHeight = window.innerHeight;

// star position /size 정의
// for (let i = 0; i <= 8; i++) {
//   //한 페이지에 9개 배치 예정
//   const star = document.querySelector(`.star${i}`);
//   console.log(`star${i}: ${star}`);

//   if (i % 2 == 0) {
//     // 짝수 별이라면
//     star.style.top = myHeight / 2 + "px";
//     star.style.left = ((1 * myWidth) / 12) * i + "px";
//     console.log("star.style.top", i, star.style.top);
//     console.log(i, star.style.left);
//   } else {
//     star.style.top = myHeight / 5 + "px";
//     star.style.left = (myWidth / 12) * i + "px";
//     console.log("star.style.top", i, star.style.top);
//     console.log(i, star.style.left);
//   }

//   star.style.width = myWidth / 10 + "px";
//   star.style.height = myHeight / 10 + "px";
//   console.log(star.style.width);
// }

//별 애니메이션
function twinkle() {
  let randNum1 = Math.floor(Math.random() * (10 - 1) + 1);
  let randNum2 = Math.floor(Math.random() * (10 - 1) + 1);
  // let randNum3 = Math.floor(Math.random() * (10 - 1) + 1);

  const star1 = document.querySelector(`.star${randNum1}`);
  const star2 = document.querySelector(`.star${randNum2}`);
  // const star3 = document.querySelector(`.star${randNum3}`);

  star1.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 0.5,
      },
      {
        opacity: 0.7,
      },
      {
        opacity: 1,
      },
    ],
    700
  );
  star2.animate(
    [
      {
        opacity: 0,
      },
      // {
      //   opacity: 0.5,
      // },
      // {
      //   opacity: 0.7,
      // },
      {
        opacity: 1,
      },
    ],
    2000
  );
  // star3.animate(
  //   [
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       opacity: 0.5,
  //     },
  //     // {
  //     //   opacity: 0.7,
  //     // },
  //     {
  //       opacity: 1,
  //     },
  //   ],
  //   4000
  // );
}
window.setInterval(twinkle, 2000);

// 별자리 애니메이션 끝난 후
const stStar = document.querySelector("#stStar");

stStar.addEventListener("animationend", () => {
  //css 애니메이션에 적용되는 animationend 속성
  // console.log("animation end");
  stStar.style.display = "none";
});

// 페이징
