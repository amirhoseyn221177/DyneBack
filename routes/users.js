var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

/* GET users listing. */
router.post('/adduser', async(req, res, next)=> {
  let User=mongoose.model('User')
  let user = new User(req.body)
  console.log(user)
  try{
    await user.save()
  }catch(e){
    console.error(e)
  }


  // await User.deleteMany({},(e)=>{
  //   if(e) console.log(e)
  // })
  // const all=await User.find({})
  // console.log(all.length)
  const all = await User.find({}).exec()
  console.log(all)
});


router.delete(`/deleteuser/:id`,async(req,res)=>{
  try{
    let User=mongoose.model('User')
    await User.deleteOne({_id:req.params.id},(e)=>{
      if(e)console.log(e)
      else{
        console.log('it is saved')
      }
    })
  }catch(e){
    console.log(e)
  }
})

router.put(`/updateuseremail/:id`,async(req,res)=>{
  let User=mongoose.model('User')
  await User.updateOne({_id:req.params.id},{email:req.body.email},(e)=>{
    if(e)console.log(e)
    else{
      console.log("great success")
    }
  })
  const all = await User.find({}).exec()
  console.log(all)
})



module.exports = router;
