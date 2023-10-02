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
  '"2023년도 벌써..."',
];
let randCmtNum = Math.floor(Math.random() * cmtArr.length);
cmt.innerText = cmtArr[randCmtNum];

// star position /size 정의
for (let i = 1; i <= starCnt; i++) {
  const star = document.querySelector(`.star${i}`);
  const p = document.querySelector(`#p${i}`);

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

// resize event
window.addEventListener('resize', resizeStars);

function resizeStars() {
  for (let i = 1; i <= starCnt; i++) {
    const star = document.querySelector(`.star${i}`);
    const p = document.querySelector(`#p${i}`);

    if (i % 2 == 0) {
      // 짝수 별이라면
      if (window.innerWidth <= 480) {
        // 모바일용
        star.style.top = window.innerHeight / 4 + 'px';
        star.style.left = ((1 * window.innerWidth) / 11) * i + 'px';
      } else {
        star.style.top = window.innerHeight / 3 + 'px';
        star.style.left = ((1 * window.innerWidth) / 10) * i + 'px';
      }
    } else {
      //홀수 별이라면
      if (window.innerWidth <= 480) {
        // 모바일용 크기
        star.style.top = window.innerHeight / 20 + 'px';
        star.style.left = (window.innerWidth / 11) * i + 'px';
      } else {
        star.style.top = window.innerHeight / 10 + 'px';
        star.style.left = (window.innerWidth / 10) * i + 'px';
      }
    }

    if (myWidth <= 480) {
      // 모바일용 크기
      star.style.width = window.innerWidth / 8 + 'px';
      star.style.height = window.innerHeight / 10 + 'px';
    } else {
      star.style.width = window.innerWidth / 8 + 'px';
      star.style.height = window.innerHeight / 8 + 'px';
    }
  }
}

//별 애니메이션
function twinkle() {
  let randNum1 = Math.floor(Math.random() * (starCnt + 1 - 1) + 1);
  let randNum2 = Math.floor(Math.random() * (starCnt + 1 - 1) + 1);
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
  stStar.style.display = 'none';
});

// 개인 편지함으로 id 보내기
const stars = document.querySelectorAll('.star');

//버튼 js
// 1. 페이징
btnLeft.addEventListener('click', prevPage);
btnRight.addEventListener('click', nextPage);

let curPage = 0;

function prevPage() {
  if (curPage > 0) {
    //현재 페이지가 1보다 큰 경우에만 이전 페이지로
    // 데이터 -7(별 개수)
    const p = document.querySelectorAll('p');
    const a = document.querySelectorAll('.a');
    const starImg = document.querySelectorAll('.starImg');

    try {
      axios({
        method: 'GET',
        url: `/prevPage?curPage=${curPage}`,
      }).then((res) => {
        curPage--; //앞에서 빼주어야 올바른 현재 페이지(이전 페이지)로 이동
        const data = res.data.data;
        const startIndex = (curPage - 1) * starCnt; //0
      

        // step 1) a태그 내 링크 수정
        for (let i = 0; i < a.length; i++) {
          const dataIndex = startIndex + i + starCnt;

          if (data[dataIndex]) {
            a[i].href = `/letter/MyLetter/${data[dataIndex].id}`;
          } else {
            a[i].href = '#';
          }
        }

        // step 2) p태그 내 닉네임 수정
        for (let i = 0; i < p.length; i++) {
          //data.length는 8이라 p 인덱스에러 나니까 p.length로 수정
          const dataIndex = startIndex + i;

          if (data[dataIndex]) {
            //데이터 있을 때 출력
            p[i].innerText = data[dataIndex].nickname;
          } else {
            p[i].innerText = '';
          }
        }

        // step 3) data 있을 때만 img 보이도록
        for (let i = 0; i < starImg.length; i++) {
          const dataIndex = startIndex + i + starCnt;

          if (data[dataIndex]) {
            starImg[i].style.display = 'block';
          } else {
            starImg[i].style.display = 'none';
          }
        }
      });
    } catch (err) {
      console.error('Error', err);
    }
  }
}

function nextPage() {
  const a = document.querySelectorAll('.a');
  const p = document.querySelectorAll('p');
  const star = document.querySelectorAll(`.star`);
  const starImg = document.querySelectorAll(`.starImg`);

  try {
    axios({
      method: 'GET',
      url: `/nextPage?page=${curPage}`,
    }).then((res) => {
      const data = res.data.data;
      const startIndex = curPage * starCnt;
      //curPage가 1부터 시작하므로 curPage -1 안 해야 알맞게 다음pg 데이터 인덱싱

      // step 1) a태그 내 링크 수정
      for (let i = 0; i < a.length; i++) {
        const dataIndex = startIndex + i + starCnt;

        if (data[dataIndex]) {
          a[i].href = `/letter/MyLetter/${data[dataIndex].id}`;
          
        } else {
          a[i].href = '#';
          
        }
      }

      // step 2) p 태그 내용 수정
      for (let i = 0; i < p.length; i++) {
        const dataIndex = startIndex + i;

        if (data[dataIndex]) {
          p[i].innerText = data[dataIndex].nickname;
        } else {
          p[i].innerText = '';
        }
      }

      // step 3) data 있을 때만 img 보이도록
      for (let i = 0; i < starImg.length; i++) {
        const dataIndex = startIndex + i + starCnt;

        if (data[dataIndex]) {
          starImg[i].style.display = 'block';
        } else {
          starImg[i].style.display = 'none';
        }
      }

      curPage++;
      
    });
  } catch (err) {
    console.error('Error', err);
  }
}

btnResister.addEventListener('click', () => {
  document.location.href = '/user/register';
});
btnLogin.addEventListener('click', () => {
  document.location.href = '/user/login';
});
btnLogout.addEventListener('click', () => {
  document.location.href = '/logout';
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // 엔터 키가 눌렸을 때 로그인 버튼 클릭
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.click();
    }
  }
});

function realSearch() {
  const aElements = document.querySelectorAll('.a');
  for (let search of aElements) {
    search.href = '#';
   
  }

  const pElements = document.querySelectorAll('.pname');
  for (let search of pElements) {
    search.innerText = '';
  }
  const searchBox = document.querySelector('#searched').value;

  axios({
    method: 'get',
    url: '/search',
    params: {
      keyword: searchBox,
    },
  })
    .then((res) => {
      const searchData = res.data.data;
      const numResults = Math.min(searchData.length, aElements.length);

      // 검색 결과가 있을 때만 변경
      if (numResults > 0) {
        for (let i = 0; i < numResults; i++) {
         
          pElements[i].innerText = searchData[i].nickname;
          aElements[i].href = `/letter/MyLetter/${searchData[i].id}`;
          pElements[i].style.color = '#37e2d5';
        }
      } else {
        alert('해당 닉네임이 존재하지 않습니다');
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

// 툴팁 js
let tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);

let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
