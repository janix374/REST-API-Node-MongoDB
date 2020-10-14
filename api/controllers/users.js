const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.users_create_new_user = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if(user.length>=1){
            return res.status(409).json({
                message: 'Mail alredy exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash)=>{
                if(error){
                    return res.status(500).json({
                        error: error
                    });
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    });
                }
            });
        }
    })
}

exports.users_login_user = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'auth faild'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            } 
            if(result) {
            const token = jwt.sign(
                    { 
                    email: user[0].email,
                    userId: user[0]._id
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: '1h'
                    }, 
                )
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          error: error
        });
      });
}

exports.users_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted'
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: error
        });
      });
  }