import { ADD_BOOK, BOOK_ERROR, CLEAR_BOOK, GET_BOOKS } from "../types";
export default  (state, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return ({...state, book : action.payload})
        case GET_BOOKS:
            return ({...state, books : action.payload})
        case BOOK_ERROR:
            return ({...state, error : action.payload})  
        case CLEAR_BOOK:
            return ({ ...state, error: null, book: null })  
        default:
            return state;
    }
}