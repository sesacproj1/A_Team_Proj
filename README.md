## Sessac X Coding on A_Team_Project 송편지
> node.js + express를 이용한 온라인 롤링페이퍼 사이트


<img width="100%" src="https://github.com/LOBSTER10000/Green-Project/assets/111476138/65dd6beb-8460-484f-90ec-43ca3435cdc7">


>  추석을 맞이해 모든 사람들이 가볍게 편지를 남길 수 있는 온라인 롤링페이퍼 시스템

## 💻 프로젝트 설명
웹 배포 주소 : <http://49.50.162.160:8000>
 * 왜 프로젝트를 만들었는가? 
 
   (1) 
   
   (2) 
   
   (3) 

 * 프로젝트로 기대하는 점? 
 
   (1) 
   
   (2) 
 
   
## ⏲개발기간
 * 2023년 9월 6일 ~ 2023년 9월 22일
 
## 👨‍👩‍👧‍👦멤버구성
* 이동규(LOBSTER10000) : 
   회원가입&로그인&마이페이지&편지쓰기&공지사항 ui 디자인 , 메인페이지 검색 기능, 공지사항 crud 기능
* 강혜빈(ch0rckbean) 프론트엔드 : 
   메인페이지 & 편지함 ui 디자인, 메인페이지&편지함 페이징 기능, 주제 기획, 회의록 작성
* 홍민영(HongMinYeong) 백엔드 : 
   회원가입&로그인&정보찾기 기능, 좋아요 기능, 마이페이지 프로필 변경 기능
* 최태영(chitty12) 백엔드 : 
   편지글 crud 기능, 알림 기능, 친구신청/목록 기능, 시퀄라이즈 model 구조 생성


## ⚙개발환경
 * Java : <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/> Java 11
 * IDE : <img src="https://img.shields.io/badge/VSC-000000?style=flat-square&logo=visualstudiocode idea&logoColor=white"/> Visual Studio Code 1.81
 * Framework : <img src="https://img.shields.io/badge/nodedotjs-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> Node.js (20.5.0)
 * Database : <img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white"/> Mysql (workbench 8.0)
 * ORM : <img src="https://img.shields.io/badge/sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white"/> Sequelize 6.32.1
 * Server : <img src="https://img.shields.io/badge/naver-03C75A?style=flat-square&logonaver&logoColor=white"/> Naver Cloud Platform

## ⭕ 라이브러리

 * Bcrypt : 5.1.1
 * Cookie-parser : 1.4.6
 * ejs : 3.1.9
 * express : 4.18.2
 * express-session : 1.17.3
 * multer : 1.4.4
 * nodemailer : 6.9.5
 * sequelize : 6.32.1
   

## 📙 개발 준비

   * <b>애자일 방법을 택하여 2주간 스프린트로 만들기로 결정</b>

   * ERD : <b>ERD Cloud 이용</b> https://www.erdcloud.com/d/qPe4s2tMBuPfLCFP2
       
       - <img width="50%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/650ba5f0-986d-4844-948b-8d16165516a5">
       

   * 프로토타입툴 : <b>KAKAO OVEN 이용</p> https://ovenapp.io/view/XJlmcBlyGazNrrLn23jzIp5uTfjYi8zS/

       - <img width="50%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/51b74aed-5bab-46ae-b168-198d45bcc000">

   * 회의록 : <b>Notion 사용하여 날짜별 회의 작성</p> https://arrow-protest-8bc.notion.site/8254c90c86b545789844955ee7b1f385?v=280446ff53bd4eea8b91d922ada6c1ee

       - <img width="50%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/76978b79-3dce-4a72-998b-447d0526b895">


## 📺 화면 구성
 <div>
   <table>
    <tbody>
     <tr>
     <td align="center">
       메인페이지
      </td>
      <td align="center">
       로그인&회원가입
      </td>
     </tr>
     <tr>
      <td>
       <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/23a8218d-e3db-4a41-a9d3-1667ad55cf5f">
     </td>
      <td>
       <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/b68f4347-e851-4d45-b559-fbbb2e59e382">
      </td>
     </tr>
     <tr>
      <td align="center">편지함 조회 및 페이징</td>
      <td align="center">마이페이지</td>
     </tr>
     <tr>
      <td>
       <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/f3964c32-1422-49f2-92c0-b657d279a61c">
      </td>
       <td>
         <img width="100%" height="30%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/41a68118-bf4e-4fde-8ba3-1fcf814d343f">
      </td>
     </tr>
      <tr>
      <td align="center">편지함(친구신청 및 목록 확인)</td>
      <td align="center">편지쓰기</td>
     </tr>
     <tr>
      <td>
       <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/c7fdf174-3456-4b71-98c3-ae9aa2e05f53">
      </td>
       <td>
        <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/4928314d-05de-42a8-9b31-8580685b8be4">
      </td>
     </tr>
     <tr>
      <td align="center">편지 확인</td>
      <td align="center">공지 사항 글쓰기</td>
     </tr>
     <tr>
       <td>
        <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/5b7aa6d0-2719-4fb4-a62c-d24f324177f9">
      </td>
       <td>
      <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/d5501c6a-7323-4a91-9f26-3e04653f72b2">
      </td>
     </tr>
     <tr>
      <td align="center"> 404에러페이지 </td>
     </tr>
     <tr>
       <td>
         <img width="100%" src="https://github.com/sesacproj1/A_Team_Proj/assets/111476138/7dee776e-37b6-42ae-ba57-85288476365c">
      </td>
     </tr>
    </tbody>
 </table>
</div>
 
## 📌주요기능 (모든 기능 전반에 AXIOS기능 사용)

  🟩 <strong>로그인/회원가입/정보찾기</strong>
  
    * (회원가입) 회원가입에 필요한 모든 폼에 유효성 검증
    * (회원가입) Bcrypt를 이용한 비밀번호 암호화 작업
    * (로그인) 로그인에 실패할 시 어느 부분에서 실패했는지 유효성 검증
    * (로그인) 아이디 저장을 누를 시에 쿠키를 통해 1주일간 해당 아이디 저장 & 로그인시 세션 기능
    * (정보 찾기) Node Mailer를 통한 자신의 회원 정보 찾기 기능
  
  🟩 <strong>메인페이지 검색/페이징</strong>
  
    * (검색) 메인페이지에서 편지함 검색 기능을 axios를 통해서 구현
    * (페이징) 모든 회원의 정보값을 7개의 별을 기준으로 axios로 페이징 구현
  
  🟩 <strong>편지쓰기/편지내용</strong>
 
    * (쓰기) 원하는 아이콘을 선택한 후 편지를 쓸 수 있게 만듦
    * (쓰기) 비회원도 쓸 수 있게끔하고, 지울 수 있는 비밀번호를 따로 받게 설정
    * (내용) 회원이 입력한 정보 값들을 토대로 내용을 페이징 기능으로 확인 가능
  
  🟩 <strong>친구추가/삭제</strong>
  
    * (추가) 추가를 누를 경우 상대방에게 해당 내용이 친구신청 목록에 뜨게 적용
    * (추가) 해당 친구신청 목록을 수락/거절 할 수 있으며, 수락할 경우 친구목록에 등록   
    * (삭제) 친구목록에서 친구 삭제시 삭제 적용되며, 당사자의 친구 목록에서도 자동 삭제
    
  🟩 <strong>좋아요 기능</strong>
  
    * 각각의 편지함에서 해당하는 글에 좋아요 기능 추가

 🟩 <strong>알림 기능</strong>
 
    * 자신의 편지함에서 좋아요, 편지 쓰기, 친구 신청이 올 경우 알림이 가도록 구현
    * 해당 알림을 클릭할 경우 알림의 숫자가 줄어들게 구현
    * 알람 삭제를 클릭할 경우 모든 알림 삭제하도록 기능 구현
    
 🟩 <strong>마이페이지/공지사항</strong>

    * (마이페이지) Multer 기능을 이용한 프로필 사진 변경 기능
    * (공지사항) Admin 계정으로만 Write,Update,Delete가 가능한 공지사항
    

## 📃 참고
   * 내 트리를 꾸며줘(종료) : https://colormytree.me/
  

<!-- ## 설치 방법

OS X & 리눅스:

```sh
npm install my-crazy-module --save
``` -->

<!-- ## 사용 예제

스크린 샷과 코드 예제를 통해 사용 방법을 자세히 설명합니다.

_더 많은 예제와 사용법은 [Wiki][wiki]를 참고하세요._

## 업데이트 내역

* 0.2.1
    * 수정: 문서 업데이트 (모듈 코드 동일)
* 0.2.0
    * 수정: `setDefaultXYZ()` 메서드 제거
    * 추가: `init()` 메서드 추가
* 0.1.1
    * 버그 수정: `baz()` 메서드 호출 시 부팅되지 않는 현상 (@컨트리뷰터 감사합니다!)
* 0.1.0
    * 첫 출시
    * 수정: `foo()` 메서드 네이밍을 `bar()`로 수정
* 0.0.1
    * 작업 진행 중

## 정보

이름 – [@트위터 주소](https://twitter.com/dbader_org) – 이메일주소@example.com

XYZ 라이센스를 준수하며 ``LICENSE``에서 자세한 정보를 확인할 수 있습니다.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## 기여 방법

1. (<https://github.com/yourname/yourproject/fork>)을 포크합니다.
2. (`git checkout -b feature/fooBar`) 명령어로 새 브랜치를 만드세요.
3. (`git commit -am 'Add some fooBar'`) 명령어로 커밋하세요.
4. (`git push origin feature/fooBar`) 명령어로 브랜치에 푸시하세요. 
5. 풀리퀘스트를 보내주세요. -->

<!-- Markdown link & img dfn's -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/LOBSTER10000/Green-Project/graphs/contributors
 --> 