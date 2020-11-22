var express = require('express');
var router = express.Router();
const mongoose=require('mongoose')

/* GET users listing. */
router.post('/adduser', async(req, res, next)=> {
  console.log(mongoose.models)
  let User=mongoose.model('User')
  req.body
  let user = new User(req.body)
  console.log(user)
  try{
    await user.save()
  }catch(e){
    console.error(e)
  }

  const all = await User.find({})
  console.log(all.length) 
  // await User.deleteMany({},(e)=>{
  //   if(e) console.log(e)
  // })
  // const all=await User.find({})
  // console.log(all.length)
});






module.exports = router;
