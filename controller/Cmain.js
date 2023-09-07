const output = {
  index: (req, res) => {
    res.render('index');
  },
};

const input = {
  login: (req, res) => {},
};

module.exports = { output, input };
