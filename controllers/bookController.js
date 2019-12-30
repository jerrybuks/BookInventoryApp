const { getBooks, addBook, editBook, findBookById, deleteBook } = require('../services/bookServices');

const { validationResult } = require('express-validator')
const AppError = require('../utils/appError');
const config = require('config');

module.exports = function authController() {
	this.getAllUserBooks = (req, res, next) => {
        getBooks(req.user)
            .then((books) => {
                res.status(200).json({
                    status : true,
                    books
                })
            })
            .catch(error => {
                return next(new AppError(error, 500));
            })
		
	};

	this.addBook = (req, res, next) => {
        const errors = validationResult(req)
        console.log("hiiiiiiii",req.body)
        if(!errors.isEmpty()) {
            return next(new AppError(errors, 400));
        }
        addBook(req)
            .then((book) => {
                res.status(200).json({
                    message: "Book was successfully added",
                    book
                })
            })
            .catch(error => {
                return next(new AppError(error, 500));
            })
    };
    
    this.editBook = (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return next(new AppError(errors, 400));
        }
    
        findBookById(req.params.id)
            .then((book) => {
                if(book.user.toString()!== req.user) {
                    return next(new AppError("You are not authorized to perform this action", 400));
                }
                if(book) {
                    editBook(req.body)
                        .then((editedBook) => {
                            res.status(200).json({
                                message: "Book was successfully edited",
                                editedBook
                            })
                        })
                        .catch( error => {return next(new AppError(error, 500)); } )
                } else {
                    return next(new AppError("failed to edit book", 400));
                }
            })
            .catch( error => { return next(new AppError("Book not found", 404)); } )
       // 
    };

    this.deleteBook = (req, res, next) => {
        findBookById(req.params.id)
            .then((book) => {
                console.log(book)
                if(book.user.toString()!== req.user) {
                    return next(new AppError("You are not authorized to perform this action", 400));
                }
                if(book) {
                    deleteBook(book._id)
                        .then((editedBook) => {
                            res.status(200).json({
                                status: true,
                                message: "Book was successfully deleted",
                                editedBook
                            })
                        })
                        .catch( error => {return next(new AppError(error, 500)); } )
                } else {
                    return next(new AppError("failed to delete book", 400));
                }
            })
            .catch(error => { return next(new AppError("Cannot delete, book not found", 404)); })
    }
};
