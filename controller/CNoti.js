const { Post, Notification, RequestList } = require('../models');

// 알람 시간 나타내는 함수
function times(date) {
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let ti; // AM , PM
  let hh = date.getHours(); // 시간
  let mm = date.getMinutes(); // 분
  let ss = date.getSeconds(); // 초

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

    const sender = showNoti.map((send) => send.sender);
    const postNo = showNoti.map((post) => post.postNo);
    // const timeAt = showNoti.map((time) => time.createdAt);
    // const createdAt = parseISODateStrings(timeAt);

    // console.log(createdAt);
    const reqFriend = await RequestList.findOne({
      where: { id: receiver },
    });

    if (showNoti && reqFriend) {
      res.send({
        sender: sender,
        postNo: postNo,
        // postTime: times(createdAt),
        isFriend: 'true',
      });
    } else if (showNoti) {
      res.send({
        sender: sender,
        postNo: postNo,
        // postTime: times(createdAt),
        isFriend: 'false',
      });
    }
  },

  postNoti: async (req, res) => {
    const { letterNo, postNo } = req.params.postNo;
    console.log(req.params);
    await Notification.destroy({
      where: { letterNo: letterNo, postNo: postNo },
    });

    res.send('true');
  },
};

const input = {
  deleteNoti: async (req, res) => {
    const { receiver, postNo } = req.params;
    await Notification.destroy({
      where: { letterNo: receiver, postNo: postNo },
    });
    res.send('true');
  },
};

module.exports = { output, input };
