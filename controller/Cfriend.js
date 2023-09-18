const { User, Friend, toFriend, RequestList } = require('../models');

// const userInfo = req.session.userInfo;

const input = {
  reqFriend: async (req, res) => {
    const id = req.body.id;
    // const toId = req.params.letterNo;
    const userInfo = req.session.userInfo;
    const fromUserId = userInfo.userId;
    console.log('fromUserId는~~~', fromUserId);

    const checkFriend = await toFriend.findOne({
      where: { id: id, toFriendUserId: fromUserId },
    });

    const checkRequest = await RequestList.findOne({
      where: { id: id, nickname: fromUserId },
    });

    if (!checkFriend && !checkRequest) {
      await RequestList.create({
        id: id,
        nickname: fromUserId,
      });
      return res.send({ result: true, message: '친구신청이 완료되었습니다.' });
    } else if (checkFriend) {
      console.log('checkFriend에서 걸림');
      return res.send({ result: false, message: '이미 추가된 친구입니다.' });
    } else if (checkRequest) {
      console.log('checkRequest에서 걸림');
      return res.send({
        result: false,
        message: '이미 친구신청한 상태입니다.',
      });
    }
  },
  reqFriendCancel: async (req, res) => {
    const id = req.body.id; //주인
    const userInfo = req.session.userInfo;
    const fromUserId = userInfo.userId;

    await RequestList.destroy({
      where: { id: id, nickname: fromUserId },
    });
    return res.send({
      message: '친구신청이 취소되었습니다.',
    });
  },

  delFriend: async (req, res) => {
    const friend = await User.findOne({
      where: { userId: req.body.id },
    });
    console.log(friend.id); //3
    console.log(req.body.id); //hb1234
    console.log(req.body.meuserId); //alsdud1240
    console.log(req.body.meid); //3
    //3,hb1234 -> 이건 왜 삭제 안되지
    //1,alsdud1240
    try {
      await Promise.all([
        Friend.destroy({
          where: { id: friend.id, friendUserId: req.body.meuserId },
        }),
        Friend.destroy({
          where: { id: req.body.meid, friendUserId: req.body.id },
        }),
      ]);
      console.log('친구 삭제 완료');
      res.send({ message: '친구삭제가 완료되었습니다.' });
    } catch (error) {
      console.error('친구 삭제 중 오류 발생:', error);
    }
  },

  rejectRequest: async (req, res) => {
    const userId = req.body.userId;
    const userInfo = req.session.userInfo;
    const id = userInfo.id;

    // 요청 거절시 request 목록에서 삭제
    await RequestList.destroy({
      where: { id: id, nickname: userId },
    });

    res.send({ result: 'true' });
  },
};

const output = {
  // showFriend: async (req, res) => {
  //   if (req.session.userInfo !== undefined) {
  //     const userInfo = req.session.userInfo;
  //     console.log(userInfo);
  //     const id = userInfo.id;
  //     console.log(id);
  //     // 요청을 보내서 추가된 경우 : Friend에서 id값으로 추출
  //     const FriendList = await Friend.findAll({
  //       where: { id: id },
  //       attributes: ['friendUserId'],
  //       raw: true,
  //     });
  //     console.log(FriendList);
  //     // 요청 수락해서 추가된 경우 : toFriend에서 id값으로 추출
  //     const toFriendList = await toFriend.findAll({
  //       where: { id: id },
  //       attributes: ['toFriendUserId'],
  //       raw: true,
  //     });
  //     const myFriend = [FriendList, toFriendList];
  //     console.log('친구목록>>', myFriend);
  //     res.render('letter/friends', {
  //       session: req.session.userInfo,
  //       profile: req.session.profile,
  //     });
  //   } else {
  //     res.render('user/login', {
  //       session: req.session.userInfo,
  //       isLogin: false,
  //       message: '잘못된 접근입니다. 로그인해주세요',
  //     });
  //   }
  // },

  showRequest: async (req, res) => {
    const userInfo = req.session.userInfo;
    const id = userInfo.id;
    const requests = await RequestList.findAll({
      where: { id: id },
      attributes: ['nickname'],
      raw: true,
    });

    res.render('letter/friendConfirm', {
      requests: requests,
      session: req.session.userInfo,
    });
  },

  confirmRequest: async (req, res) => {
    const userId = req.body.id;
    const userInfo = req.session.userInfo;
    // const id = userInfo.id;
    const requestId = req.body.requestId;
    const isConfirm = req.body.isConfirm;
    //리퀘스트리스트
    const request = await RequestList.findAll({
      where: { id: userId },
    }); //내 아이디로 온 요청값
    const requestData = request.map((user) => ({
      userId: user.nickname,
    }));
    // console.log(requestData); //[ { userId: 'hb1234' }, { userId: 'h11' } ]

    const foundUser = requestData.find((user) => user.userId === requestId);
    console.log(foundUser); //{ userId: 'hb1234' }

    if (isConfirm) {
      // // 요청 수락/거절시 request 목록에서 삭제
      await RequestList.destroy({
        where: { nickname: foundUser.userId },
      });

      await Friend.create({
        id: userId,
        friendUserId: requestId,
      });
      const requestFriend = await User.findOne({
        where: { userId: requestId },
      });
      await Friend.create({
        id: requestFriend.id,
        friendUserId: userInfo.userId,
      });

      res.send({ message: '요청이 수락되었습니다.' });
    } else {
      // // 요청 수락/거절시 request 목록에서 삭제
      await RequestList.destroy({
        where: { nickname: foundUser.userId },
      });

      res.send({ message: '요청이 거절되었습니다.' });
    }
  },
};

module.exports = { input, output };
