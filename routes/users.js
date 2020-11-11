const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const mongoose=require('../MongodDB/DBSetup')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(mongoose.models)
});



module.exports = router;
