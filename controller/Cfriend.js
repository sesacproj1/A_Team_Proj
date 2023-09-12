const { User, Friend, toFriend, RequestList } = require('../models');

const input = {
  reqFriend: async (req, res) => {
    const toId = req.params.id;

    const fromNickname = req.body.nickname;
    const checkFriend = await toFriend.findOne({
      where: { id: toId, toFriendUserId: fromNickname },
    });

    const checkRequest = await RequestList.findOne({
      where: { id: toId, nickname: fromNickname },
    });

    if (!checkFriend && !checkRequest) {
      await RequestList.create({
        id: toId,
        nickname: fromNickname,
      });
      res.send({ result: 'true' });
    } else if (checkFriend) {
      // 이미 추가된 친구입니다.
      res.send('중복1');
    } else if (checkRequest) {
      // 이미 요청한 상태입니다.
      res.send('중복2');
    }
  },

  delFriend: async (req, res) => {
    await Friend.destroy({
      where: { id: req.params.id },
    });
    await toFriend.destroy({
      where: { id: req.params.id },
    });

    res.send('true');
  },
};

const output = {
  showFriend: async (req, res) => {
    const id = req.params.id;
    // 요청을 보내서 추가된 경우 : Friend에서 id값으로 추출
    const FriendList = await Friend.findAll({
      where: { id: id },
      attributes: ['friendUserId'],
      raw: true,
    });
    console.log(FriendList);
    // 요청 수락해서 추가된 경우 : toFriend에서 id값으로 추출
    const toFriendList = await toFriend.findAll({
      where: { id: id },
      attributes: ['toFriendUserId'],
      raw: true,
    });
    const myFriend = [FriendList, toFriendList];
    console.log('친구목록>>', myFriend);
    res.send({ myFriend: myFriend });
  },

  showRequest: async (req, res) => {
    const id = req.params.id;
    const requests = await RequestList.findAll({
      where: { id: id },
    });

    res.send({ requests: requests });
  },

  admitRequest: async (req, res) => {
    const nickname = req.body.nickname;
    const id = req.params.id;
    // 요청 수락시 request 목록에서 삭제
    await RequestList.destroy({
      where: { nickname: nickname },
    });
    // 요청을 수락한 User의 친구목록에 nickname 추가
    await toFriend.create({
      id: id,
      toFriendUserId: nickname,
    });

    const addFriend = await User.findOne({
      where: { nickname: nickname },
      attributes: ['id'],
    });
    // 요청을 수락받은 User의 친구목록에 수락한 User의 nickname 추가

    await Friend.create({
      id: addFriend.id,
      friendUserId: nickname,
    });

    res.send({ result: 'true' });
  },
};

module.exports = { input, output };
