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

let currentPage = 1; // 현재 페이지

function prevPage() {
  if (currentPage > 1) { // 현재 페이지가 1보다 큰 경우에만 이전 페이지로 이동
    const p = document.querySelectorAll('p');

    try {
      axios({
        method: 'GET',
        url: `/prevPage?page=${currentPage}`,
      }).then((res) => {
        const data = res.data.data;
        const startIndex = (currentPage - 1) * 7; // 시작 인덱스 계산

        for (let i = 0; i < p.length; i++) {
          const dataIndex = startIndex + i;
          // 데이터가 있으면 데이터를 출력하고, 없으면 빈 객체로 대체하여 출력
          if (data[dataIndex]) {
            p[i].innerText = data[dataIndex].nickname;
          } else {
            p[i].innerText = ''; // 빈 객체로 처리
          }
        }

        currentPage--; // 이전 페이지로 이동
      });
    } catch (err) {
      console.log('Error', err);
    }
  }
}

function nextPage() {
  const p = document.querySelectorAll('p');

  try {
    axios({
      method: 'GET',
      url: `/nextPage?page=${currentPage}`,
    }).then((res) => {
      const data = res.data.data;
      const startIndex = (currentPage - 1) * 7; // 시작 인덱스 계산

      for (let i = 0; i < p.length; i++) {
        const dataIndex = startIndex + i;
        // 데이터가 있으면 데이터를 출력하고, 없으면 빈 객체로 대체하여 출력
        if (data[dataIndex]) {
          p[i].innerText = data[dataIndex].nickname;
        } else {
          p[i].innerText = ''; // 빈 객체로 처리
        }
      }

      currentPage++; // 다음 페이지로 이동
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
