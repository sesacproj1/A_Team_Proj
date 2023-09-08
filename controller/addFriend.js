const { User } = require('../models/User');
const { Friend } = require('../models/Friend');
const { toFriend } = require('../models/toFriend');
const { RequestList } = require('../models/RequestList');

exports.reqFriend = async (req, res) => {
  const { toId } = req.params;
  const { fromNickname } = req.body;
  const checkFriend = await toFriend.findOne({
    where: { id: toId, nickname: fromNickname },
  });
  const checkRequest = await RequestList.findOne({
    where: { id: toId, nickname: fromNickname },
  });

  if (!checkFriend && !checkRequest) {
    await RequestList.create({
      id: toId,
      nickname: fromNickname,
    });
    res.send('true');
  } else if (checkFriend) {
    // 이미 추가된 친구입니다.
    res.send('중복1');
  } else if (checkRequest) {
    // 이미 요청한 상태입니다.
    res.send('중복2');
  }
};

exports.showRequest = async (req, res) => {
  const { id } = req.params;
  const requests = await RequestList.findAll({
    where: { id: id },
  });

  res.send({ requests: requests });
};

exports.admitRequest = async (req, res) => {
  const { nickname } = req.body.nickname;
  const { id } = req.params;

  await toFriend.create({
    id: id,
    nickname: nickname,
  });

  const addFriend = await User.findOne({ where: { nickname: nickname } });

  await Friend.create({
    id: addFriend[0].id,
    nickname: addFriend[0].nickname,
  });

  res.send('true');
};
