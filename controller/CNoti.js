const {
  Post,
  Notification,
  RequestList,
  NotificationLikes,
} = require('../models');
const { Op } = require('sequelize');

// 알람 시간 나타내는 함수
function times(date) {
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let ti;
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  ti = hh < 12 ? '오전' : '오후';
  hh = hh > 12 ? hh - 12 : hh;
  hh = hh < 10 ? `0${hh}` : hh;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;

  return `${mon}월 ${day}일 ${ti} ${hh} : ${mm} : ${ss}`;
}

function parseISODateStrings(dateArray) {
  const parsedDates = [];

  for (const dateString of dateArray) {
    const date = new Date(dateString);
    parsedDates.push(date);
  }

  return parsedDates;
}

const output = {
  showNoti: async (req, res) => {
    const receiver = req.params.letterNo;
    const showNoti = await Notification.findAll({
      where: { letterNo: receiver },
      attributes: ['sender', 'postNo', 'createdAt'],
    });
    const showLikes = await NotificationLikes.findAll({
      where: { letterNo: receiver },
      id: { [Op.ne]: req.session.userInfo.id },
    });

    const sender = showNoti.map((send) => send.sender);
    const postNo = showNoti.map((post) => post.postNo);

    const postNum = showLikes.map((num) => num.postNo);
    const likesWho = showLikes.map((who) => who.likesWho);
    const reqFriend = await RequestList.findOne({
      where: { id: receiver },
    });

    console.log('reqFriend', reqFriend);

    // 알람 있음: showNoti or Friend or likes
    if (showNoti || reqFriend || showLikes) {
      if (reqFriend)
        res.send({
          isNoti: 'true',
          isFriend: 'true',
        });
      else {
        res.send({
          isNoti: 'true',
          isFriend: 'false',
        });
      }
    } else if (!showNoti && !reqFriend && !showLikes) {
      res.send({
        isNoti: 'false',
        isFriend: 'false',
      });
    }
  },

  postNoti: async (req, res) => {
    await Notification.destroy({
      where: { letterNo: req.body.letterNo, postNo: req.params.postNo },
    });

    res.send('true');
  },

  likesNoti: async (req, res) => {
    await NotificationLikes.destroy({
      where: { letterNo: req.body.letterNo, postNo: req.params.postLikes },
    });

    res.send('true');
  },
};

const input = {
  deleteNoti: async (req, res) => {
    await Notification.destroy({
      where: { letterNo: req.params.id },
    });
    await NotificationLikes.destroy({
      where: { letterNo: req.params.id },
    });
    res.send('true');
  },
};

module.exports = { output, input };
