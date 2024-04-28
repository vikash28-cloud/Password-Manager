const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PasswordModel = mongoose.model('PasswordModel');
const protectedRoute = require('../middleware/Protected');


router.post('/', protectedRoute, (req, res) => {
    const { site, username, password } = req.body;
    if (!site || !username || !password) {
        return res.status(400).json({ Error: "Please fill all the fields" });
    }
    req.user.password = undefined;
    const passObj = new PasswordModel({
        site: site,
        username: username,
        password: password,
        author: req.user
    });
    passObj.save()
        .then((newPass) => {
            res.status(201).json({ NewPassword : newPass });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/',protectedRoute, (req, res) => {
    PasswordModel.find({author: req.user._id})
    .populate('author','_id fullName')
    .then((data) => {
        res.status(200).json({Passwords: data});
    })
    .catch((err) => {
        console.log(err);
    });
})

router.delete('/:id', protectedRoute, async(req, res) => {
    try {
        const passFound = await PasswordModel.findOne({_id: req.params.id})
            .populate('author','_id')
        if(!passFound) {
            return res.status(404).json({Error: "Password not found"});
        }

        if(passFound.author._id.toString() === req.user._id.toString()){
            await passFound.deleteOne();
            return res.status(200).json({result: "Deleted successfully"});
        }else{
            return res.status(403).json({Error: "You are not authorized to delete this password"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: "Internal Server Error"});
    }
})

router.put('/:id',protectedRoute,async(req,res)=>{
    try {
        const {site,username,password} = req.body;
        const id = req.params.id;

        const updatedPassword = {
            site: site,
            username: username,
            password: password
        };

        const result= await PasswordModel.findOneAndUpdate(
            {_id:id},
            updatedPassword,
            {new: true}
        )

        return res.status(200).json({Password : result});

    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: "Internal Server Error"});
    }
})

module.exports = router;