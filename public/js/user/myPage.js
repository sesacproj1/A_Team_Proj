//TODO
// -> 로그인시 session.userInfo에 받아온값
//세션에서 id 값 가져오기
//      email 가져오기
//프로필사진 수정하기
//닉네임 수정하기
//비밀번호 수정하기
// $('#userId').text(`${}`);
// async function info(){
//     const req = await axios({
//         method: 'POST',
//         url: '/session',
//         data: {
//           user: s,
//         },
//       });

// }

// Cmail ---
// myPage: async (req, res) => {
//     // 1. userInfo 세션에 저장된 id를 이용해 현재 로그인한 유저의 id 값으로 특정 유저 정보 하나를 조회
//     // 2. mypage.ejs 랜더 + data 키로 특정 유저를 찾은 결과를 넘김
//     console.log('req.session.userInfo는~~ ', req.session.userInfo);
//     const user = await User.findOne({
//       where: { userid: req.session.userInfo.userid },
//     });
//     return res.render('user/myPage', { data: user });
//   },
// };
