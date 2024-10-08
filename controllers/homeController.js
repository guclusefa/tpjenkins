const User = require('../models/home');
 
 

async function getHome(req, res) {
    User.getHome((err, users) => {
      if (err) res.status(500).json(err);
      else res.json( users );
    });

}

module.exports = {
   getHome
};