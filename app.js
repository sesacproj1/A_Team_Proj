const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const home = require('./routes');
app.use('/', home);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('service is running');
});
