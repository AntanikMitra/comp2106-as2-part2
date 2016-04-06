var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Welcoming to our home page of Resturant booking',
        message: 'Hope you are having a good day'});
});


// make this public so the rest of app can see it
module.exports = router;
