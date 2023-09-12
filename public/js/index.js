const myWidth = window.innerWidth;
const myHeight = window.innerHeight;
const starCnt = document.querySelectorAll('.star').length; //현재 화면 내 별 개수
const starPerPage = 7; // 한 페이지에 배치할 별의 개수
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const btnResister = document.querySelector('#btnResister');
const btnLogin = document.querySelector('#btnLogin');

//버튼 js
// 이전&다음 페이지 넘어가기
btnLeft.addEventListener('click', prevPage);
btnRight.addEventListener('click', nextPage);

function prevPage() {
  const a = document.querySelectorAll('a');
  const p = document.querySelectorAll('p');

  try {
    axios({
      method: 'GET',
      url: '/nextPage',
    }).then((res) => {
      for (let i = 1; i <= res.data.data.length; i++) {
        // console.log(res.data.data);
        p[i - 1].innerText = res.data.data[i - 1].nickname;
        console.log(i - 1, p[i - 1].innerText);
      }
    });
  } catch (err) {
    console.log('Error', err);
  }
}

function nextPage() {
  const a = document.querySelectorAll('a');
  const p = document.querySelectorAll('p');
  // a.href="/user/Myletter/<%=data[i+7].id%>"
  // p.textContent = '<%=data[i+2].nickname%>';
  // console.log(p[0].innerText);

  try {
    axios({
      method: 'GET',
      url: '/nextPage',
      // params: data,
    }).then((res) => {
      // 1) a태그 내 링크 수정

      // 2) p태그 내 닉네임 수정
      // console.log(res);
      // let { nickname } = res.data.data;
      // console.log('nickname', nickname);
      for (let i = 0; i < res.data.data.length - 1; i++) {
        console.log(i, res.data.data[i].nickname);
        p[i].innerText = res.data.data[i + 7].nickname;
        if (i + 7 > res.data.data.length) {
          // p[i].innerText = res.data.data[p.length - 1].nickname;
          // p[i].innerText = res.data.data[].nickname;
          p[i].innerText = '';
          console.log('i', i);
        }
      }
    });
  } catch (err) {
    console.log('Error', err);
  }
}

// 회원가입 & 로그인 이동
btnResister.addEventListener('click', () => {
  document.location.href = '/user/register';
});
btnLogin.addEventListener('click', () => {
  document.location.href = '/user/login';
});

// star position /size 정의

for (let i = 1; i <= starCnt; i++) {
  const star = document.querySelector(`.star${i}`);
  const p = document.querySelector(`#p${i}`);


// for (let i = 0; i <= 8; i++) {
//   //한 페이지에 9개 배치 예정
//   const star = document.querySelector(`.star${i}`);
//   console.log(`star${i}: ${star}`);


  if (i % 2 == 0) {
    // 짝수 별이라면
    if (myWidth <= 480) {
      // 모바일용
      star.style.top = myHeight / 4 + 'px';
      star.style.left = ((1 * myWidth) / 11) * i + 'px';
    } else {
      star.style.top = myHeight / 3 + 'px';
      star.style.left = ((1 * myWidth) / 10) * i + 'px';
    }
  } else {
    //홀수 별이라면
    if (myWidth <= 480) {
      // 모바일용
      star.style.top = myHeight / 20 + 'px';
      star.style.left = (myWidth / 11) * i + 'px';
    } else {
      star.style.top = myHeight / 10 + 'px';
      star.style.left = (myWidth / 10) * i + 'px';
    }
    // console.log('star.style.top', i, star.style.top);
    // console.log(i, star.style.left);
  }

  if (myWidth <= 480) {
    // 모바일용 크기
    star.style.width = myWidth / 8 + 'px';
    star.style.height = myHeight / 10 + 'px';
  } else {
    star.style.width = myWidth / 8 + 'px';
    star.style.height = myHeight / 8 + 'px';
  }
}

//별 애니메이션
function twinkle() {
  let randNum1 = Math.floor(Math.random() * (starCnt + 1 - 1) + 1);
  let randNum2 = Math.floor(Math.random() * (starCnt + 1 - 1) + 1);
  // console.log('randNum', randNum1, randNum2);
  const star1 = document.querySelector(`.star${randNum1}`);
  const star2 = document.querySelector(`.star${randNum2}`);

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

      {
        opacity: 1,
      },
    ],
    2000
  );
}
window.setInterval(twinkle, 2000);


// 별자리 애니메이션 끝난 후

const stStar = document.querySelector('#stStar');

stStar.addEventListener('animationend', () => {
  //css 애니메이션에 적용되는 animationend 속성
  // console.log("animation end");
  stStar.style.display = 'none';
});
