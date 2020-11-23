var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../MongodDB/models')
const Error = require('../ErrorHandling/Error');

/* GET users listing. */
router.post('/adduser', async (req, res, next) => {
  let user = new User(req.body)
  try {
    await user.save()
  } catch (e) {
    console.error(e)
  }
  const all = await User.find({}).exec()
  console.log(all)
});


router.delete(`/deleteuser/:id`, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id }, (e) => Error(e))
  } catch (e) {
    console.log(e)
  }
})

router.put(`/updateuseremail/:id`, async (req, res) => {
  await User.updateOne({ _id: req.params.id }, { email: req.body.email }, (e) => Error(e))
  const all = await User.find({}).exec()
  console.log(all)
})

router.put('/updatereferal/:id', async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { referralUid: req.body.referralUid }, (e) => Error(e))
  } catch (e) {
    console.log(e)
  }
})


router.get('/getall', async (req, res) => {
  try {
    const all = await User.find({}, (e) => Error(e))
    console.log(all)
  } catch (e) {
    console.log(e)
  }
})

router.put('/addfriend/:id', async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }, (e) => Error(e))
    const allFriends=await user.friends
    console.log(allFriends)
    await user.save()
  } catch (e) {
    console.log(e)
  }
})

router.post('/delete', async (req, res) => {
  try {
    await User.deleteMany({}, e => Error(e))
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
