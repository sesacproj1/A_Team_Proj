const { Post, Notification } = require('../models');

const output = {
  showNoti: async (req, res) => {
    const receiver = req.params.letterNo;
    const showNoti = await Notification.findAll({
      where: { letterNo: receiver },
      attributes: ['sender'],
    });

    res.send({ sender: showNoti.sender });
  },
  movePost: async (req, res) => {
    const { letterNo, postNo } = req.params;
    const showPost = await Post.findOne({
      where: { letterNo: letterNo, postNo: postNo },
    });

    res.redirect('/MyLetter/:letterNo/:postNo');
  },
};

const input = {
  deleteNoti: async (req, res) => {
    const { receiver, postNo } = req.params;
    await Notification.destroy({
      where: { letterNo: receiver, postNo: postNo },
    });
    res.send({ result: 'true' });
  },
};

module.exports = { output, input };
