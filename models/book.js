const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    bookTitle: { type: String, required: true},
    categoryOfBook: { type: String, required : true },
    ISBN: { type: String, required : true, unique : true },
    author: { type: String, required : true },
    edition: { type: String, required : true },
    NoOfCopies : {type : String, required : true},
    publisher: { type: String, required : true },
    publicationDate: { type: String, required : true },
    createdDate: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Book', bookSchema);