// first include express
const express = require('express');
// create router
const router= express.Router();
// conect with model schema
const User = require('../model/user');
//connect mongo 
const mongoose=require('mongoose');
// add bycrypt
const bcrypt=require('bcrypt');
//jwt include
const jwt = require('jsonwebtoken')







router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'user route working '
    })
})







router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err ,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user=new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                 res.status(500).json({
                    error:err
                })
            });
        }
    })
})




router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
                msg:'user not exist..'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail..'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone

                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }

                );
                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token

                })
            }
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})











module.exports=router;
