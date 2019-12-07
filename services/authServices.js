const userModel = require('../models/user')

const signUpUser = async function(userData, hash) {
    const newUser = await new userModel(
        {
            userName: userData.userName,
            email: userData.email,
            password: hash,
        });
        return newUser.save();
}

const loginUser =  function (userData) {
    const user =  userModel.findOne({email: userData.email});
    return user
}

module.exports = {
    signUpUser,
    loginUser
}