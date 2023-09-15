const myWidth = window.innerWidth;
const myHeight = window.innerHeight;
const starCnt = document.querySelectorAll('.star').length; //현재 화면 내 별 개수
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const btnResister = document.querySelector('#btnResister');
const btnLogin = document.querySelector('#btnLogin');

// 상단 멘트 랜덤 배치
const cmt = document.querySelector('#cmt');
const cmtArr = [
  '"여름은 단번에 가을로 떨어진다."',
  '"가을은 자연의 계절이기보다는 영혼의 계절임을 나는 알았다."',
  '"추석은 야금야금 살찌는 날"',
  '"가지마 추석 연휴"',
];
let randCmtNum = Math.floor(Math.random() * cmtArr.length);
// console.log('randCmtNum', randCmtNum); // 0~3
cmt.innerText = cmtArr[randCmtNum];

//버튼 js
// 1. 페이징
btnLeft.addEventListener('click', prevPage);
btnRight.addEventListener('click', nextPage);

let curPage = 1;

function prevPage() {
  if (curPage > 1) {
    //현재 페이지가 1보다 큰 경우에만 이전 페이지로
    // 데이터 -7(별 개수)
    const p = document.querySelectorAll('p');
    try {
      axios({
        method: 'GET',
        url: `/prevPage?page=${curPage}`,
      }).then((res) => {
        // step 1) a태그 내 링크 수정

        // step 2) p태그 내 닉네임 수정
        curPage--; //앞에서 빼주어야 올바른 현재 페이지(이전 페이지)로 이동
        console.log('curPage', curPage); //1

        const data = res.data.data;
        // console.log(data.length); //8
        const startIndex = (curPage - 1) * starCnt; //0
        // console.log('start prev', startIndex); //0

        for (let i = 0; i < p.length; i++) {
          //data.length는 8이라 p 인덱스에러 나니까 p.length로 수정
          const dataIndex = startIndex + i; //0~6
          // console.log('data prev', dataIndex); //0~8

          if (data[dataIndex]) {
            //데이터 있을 때 출력
            // console.log(i, data[i]);
            // console.log(i, p[i]); //7 undefined
            p[i].innerText = data[dataIndex].nickname;
          } else {
            p[i].innerText = '';
            // star[i].innerHTML = '';
          }
        }
        // curPage--;
        // console.log('curPage', curPage);
      });
    } catch (err) {
      console.log('Error', err);
    }
  }
}

function nextPage() {
  const p = document.querySelectorAll('p');
  const star = document.querySelectorAll(`.star`);

  try {
    axios({
      method: 'GET',
      url: `nextPage?page=${curPage}`,
    }).then((res) => {
      const data = res.data.data;
      const startIndex = curPage * starCnt;
      //curPage가 1부터 시작하므로 curPage -1 안 해야 알맞게 다음pg 데이터 인덱싱
      // console.log('start next', startIndex);

      for (let i = 0; i < p.length; i++) {
        const dataIndex = startIndex + i;

        if (data[dataIndex]) {
          p[i].innerText = data[dataIndex].nickname;
        } else {
          p[i].innerText = '';
          // star[i].innerHTML = ''; //별 없애면 이전 페이지도 없어짐
        }
      }
      curPage++;
      console.log('curPage', curPage);
    });
  } catch (err) {
    console.log('Error', err);
  }
}

btnResister.addEventListener('click', () => {
  document.location.href = '/user/register';
});
btnLogin.addEventListener('click', () => {
  document.location.href = '/user/login';
});

// 2. 로그인 시 회원가입 버튼 없애고 로그인 => 로그아웃으로 변경

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
      // 모바일용 크기
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
