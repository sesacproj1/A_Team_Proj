const { User, Friend, toFriend, RequestList } = require('../models');

const input = {
  reqFriend: async (req, res) => {
    const id = req.body.id;
    const userInfo = req.session.userInfo;
    const fromUserId = userInfo.userId;

    const checkFriend = await Friend.findOne({
      where: { id: id, friendUserId: fromUserId },
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
    const id = req.body.id;
    const userInfo = req.session.userInfo;
    const fromUserId = userInfo.userId;

    await RequestList.destroy({
      where: { id: id, nickname: fromUserId },
    });
    const isFriend = await Friend.findOne({
      where: { id: id, friendUserId: fromUserId },
    });
    if (isFriend) {
      return res.send({ message: '이미 친구인 회원입니다.' });
    } else {
      return res.send({
        message: '친구신청이 취소되었습니다.',
      });
    }
  },

  delFriend: async (req, res) => {
    const friend = await User.findOne({
      where: { userId: req.body.id },
    });

    try {
      await Promise.all([
        Friend.destroy({
          where: { id: friend.id, friendUserId: req.body.meuserId },
        }),
        Friend.destroy({
          where: { id: req.body.meid, friendUserId: req.body.id },
        }),
      ]);
      res.send({ message: '친구삭제가 완료되었습니다.' });
    } catch (error) {
      console.error('친구 삭제 중 오류 발생:', error);
    }
  },

  rejectRequest: async (req, res) => {
    const userId = req.body.userId;
    const userInfo = req.session.userInfo;
    const id = userInfo.id;

    await RequestList.destroy({
      where: { id: id, nickname: userId },
    });

    res.send({ result: 'true' });
  },
};

const output = {
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
    const requestId = req.body.requestId;
    const isConfirm = req.body.isConfirm;

    const request = await RequestList.findAll({
      where: { id: userId },
    });
    const requestData = request.map((user) => ({
      userId: user.nickname,
    }));

    const foundUser = requestData.find((user) => user.userId === requestId);

    if (isConfirm) {
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
      await RequestList.destroy({
        where: { nickname: foundUser.userId },
      });

      res.send({ message: '요청이 거절되었습니다.' });
    }
  },
};

module.exports = { input, output };
