const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, trim : true, required: true},
    email: { type: String, required: true, lowercase: true, index: {unique: true, dropDups: true}},
    password: { type: String, trim : true, required : true },
    createdDate: { type: Date, default: new Date() }
})

module.exports = mongoose.model('User', userSchema);