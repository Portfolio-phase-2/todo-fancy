const User = require('../models/User')
const hash = require('../helpers/hashHelper')

module.exports      = {

    signup: (req, res) => {
        let name        = req.body.name
        let email       = req.body.email
        let password    = hash.bcencode(req.body.password)

        User.find({email:email})
        .then(user => {
            if(user.length === 0) {
                User.create({name, email, password})
                .then(newUser => {
                    res.status(201).json({
                        err:false,
                        message: `Success to add ${newUser.name}`,
                        data: newUser,
                        token:hash.jwtencode({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({err:true})
                })

            } else {
                this.login(req, res)
                res.status(400).json({message:'Email already registered!'})
            }
        })
        .catch( err => {
            res.status(500).json({err:true})
        })
    },

    signin : (req, res) => {
        let email           = req.body.email
        let password        = req.body.password

        User.findOne({email: email})
        .then( user => {
            if(hash.bcdecode(password, user.password)) { 
                res.status(200).json({
                    err:false,
                    name: user.name,
                    token:hash.jwtencode({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
            }
        })
        .catch(err => {
            res.status(500).json({err:true})
        })
    }
}