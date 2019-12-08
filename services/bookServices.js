const bookModel = require("../models/book")

const getBooks = async (id) => {
    const books = await bookModel.find({ user: id}).sort({
        date: -1
      });
    return books
}
const addBook = async (req) => {
    const newBook = await new bookModel({
        user : req.user,
        bookTitle: req.body.bookTitle,
        categoryOfBook: req.body.categoryOfBook,
        ISBN: req.body.ISBN,
        author: req.body.author,
        edition: req.body.edition,
        NoOfCopies : req.body.NoOfCopies,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        createdDate: req.body.createdDate
    })
    return newBook.save()
}
const editBook = (book) => {
    const editedBook = bookModel.findOneAndUpdate(book._id, { $set: book }, { new: true })
    return editedBook;
}
const deleteBook = (id) => {
    const res = bookModel.findByIdAndRemove(id);
    return res
}
const findBookById = (id) => {
    return bookModel.findById(id)
}
module.exports = {
    getBooks,
    addBook, 
    editBook,
    deleteBook,
    findBookById
}