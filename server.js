const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const home = require('./routes/home');
app.use('/', home)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;