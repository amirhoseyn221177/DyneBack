const express = require('express')
const router = express.Router()
const { User } = require('../MongodDB/models')
const bcrypt = require('bcrypt')
const Error = require('../ErrorHandling/Error')
const salt = 12


router.post('/create', async (req, res) => {
    try {
        let { email, password, displayName, phone, role } = await req.body
        if (password.length < 6) {
            res.status(400).json({ erorr: "your password is too short" })
        } else {
            const genedsalt = await bcrypt.genSalt(salt)
            const hashed = await bcrypt.hash(password, genedsalt)
            await User.create({ email: email, password: hashed, displayName: displayName, phone: phone, role: role }, async (e, user) => {
                await Error(e)
                res.status(200).json({ status: 'successful',user:user })
            })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ status: "we can't create your account right now " })
    }

})

router.get('/getall',async(req,res)=>{
    try{
        const all = await User.find({},e=>Error(e))
        res.json(all)
    }catch(e){
        console.error(e)

    }
})

router.delete('/delete',async(req,res)=>{
    await User.deleteMany({})
})

module.exports=router;