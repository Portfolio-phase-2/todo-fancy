const axios = require('axios')
const hash = require('../helpers/hashHelper')
const sgMail = require('@sendgrid/mail')
const User = require('../models/User')

module.exports = {
    facebook: (req, res) => {
        let url = `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${req.body.accessToken}`
        axios({
            url: url,
            method: 'GET'
        })
        .then( response => {
            User
                .findOne({email:response.data.email})
                .then( result => {
                    if(!result) {
                        let fb = {
                            name: response.data.name,
                            email: response.data.email,
                            password: hash.bcencode(response.data.id)
                        }
                        User.create(fb)
                        .then(newUser => {
                            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                            const msg = {
                                to: response.data.email,
                                from: 'talkasrul@gmail.com',
                                subject: 'Thank For Register',
                                text: 'Thanks for register in Todooku',
                                html: '<strong>Thanks for register in Todooku</strong>',
                            }
                            sgMail.send(msg);
    
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
                    } else {
                        console.log(result)
                        let token = hash.jwtencode({
                            id: result._id,
                            name: result.name,
                            email: result.email
                        })
                        res.status(200).json({token: token, name: result.name})
                    }
                })
                .catch( err => {
                    console.log(err);
                })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json(err.message)
        })
    }
}