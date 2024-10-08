const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const user = require('./routes/user');
const groupe = require('./routes/group');
const usersGroups = require('./routes/usersGroups');
app.use('/users', user)
app.use('/groupe', groupe)
app.use('/usersGroups', usersGroups)

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


module.exports = app;