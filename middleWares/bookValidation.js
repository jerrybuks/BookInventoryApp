const { check } = require('express-validator');

const bookValidation = [
	check('bookTitle', 'Book title is required').not().isEmpty(),  
    check('categoryOfBook', 'Book category is required').not().isEmpty(),  
    check('ISBN', 'ISBN is required').not().isEmpty(),  
    check('author', 'Please input authors  name').not().isEmpty(),  
    check('edition', 'Please input your the edition').not().isEmpty(),  
    check('NoOfCopies', 'Please input number of copies').not().isEmpty(),  
    check('publisher', 'Please input the publisher').not().isEmpty(),  
    check('publicationDate', 'Please input publication date').not().isEmpty(),  
];
module.exports = bookValidation;


