var express = require('express');
var router = express.Router();
const { User } = require('../MongodDB/models')
const Error = require('../ErrorHandling/Error');
const jwt = require('jsonwebtoken')
var {Key}=require('../AuthenticationKey/AuthKey');

/* GET users listing. */
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
        await User.updateOne({ _id: req.params.id },
            { $addToSet: { friends: req.body.friend } }, (e) => Error(e)) //$addToSet add value if not present, but $push adds it regardless
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete', async (req, res) => {
    try {
        await User.deleteMany({}, e => Error(e))
    } catch (e) {
        console.log(e)
    }
})


router.get('/getfriends/:id', async (req, res) => {
    try {
        const query = await User.findById({ _id: req.params.id }, { friends }, e => Error(e))
        res.json(query)
    } catch (e) {
        console.error(e)
    }
})

router.put('/unfriend/:user/friend', async (req, res) => {
    try {
        const newFriends = await User.findOneAndUpdate({ _id: req.params.id }, 'friends', { $pull: { "friends": req.params.friend } })
        res.status(200).json({ friends: newFriends })
    } catch (e) {
        console.log(e)
    }
})


router.put('/updatephoto/:id', async (req, res) => {
    try {
        // i have to exchange it with aws and send back the new url
    } catch (e) {
        console.log(e)
    }
})

router.get('/test',async(req,res)=>{
    let token= req.headers['authorization']
    let usertoken=token.split(' ')[1]
    let answer=jwt.verify(usertoken,Key)
    console.log(answer)

})




module.exports = router;
