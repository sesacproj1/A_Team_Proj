const express = require('express');
const router = express.Router();
const controllerLetter = require('../controller/CLetter');
const controllerPost = require('../controller/Cpost.js');

router.get('/letter/friends/:id', controllerLetter.output.friends);
router.get('/letter/friendConfirm', controllerLetter.output.friendConfirm);
router.get('/letter/select/:id', controllerLetter.output.icon);

// 편지함 페이지 출력
router.get('/letter/MyLetter/:id', controllerPost.output.showMyLetter);

//기능부분 (api)
router.get('/letter/MyLetter/:id/nextPage', controllerPost.output.nextPage);
router.get('/letter/MyLetter/:id/prevPage', controllerPost.output.prevPage);

// 글남기기
router.post(
    '/letter/select/:id/postLetter',
    controllerPost.input.contentRegister
  );
router.post('/letter/select/:id/icon', controllerPost.input.contentRegister);
  
// 편지보기
router.get('/letter/MyLetter/:id/:postNo', controllerPost.output.showPost);

// 좋아요
router.patch('/letter/MyLetter/:id/:postNumber/likes', controllerPost.input.updateLikes);

//좋아요취소
router.delete('/letter/MyLetter/:id/:postNumber/likes/cancel', controllerPost.input.likeCancel);

//편지글 삭제
router.delete('/post/delete/:postNo', controllerPost.input.postDelete);

module.exports = router;
