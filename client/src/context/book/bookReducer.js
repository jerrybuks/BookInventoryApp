import { ADD_BOOK, BOOK_ERROR, CLEAR_BOOK, CLEAR_STATUS, DELETE_BOOK, GET_BOOKS } from "../types";
export default  (state, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return ({...state, book : action.payload})
        case GET_BOOKS:
            return ({...state, books : action.payload})
        case DELETE_BOOK:
            return ({...state, status : action.payload})
        case BOOK_ERROR:
            return ({...state, error : action.payload})  
        case CLEAR_BOOK:
            return ({ ...state, error: null, book: null })  
        case CLEAR_STATUS:
            return ({ ...state, status: null })  
        default:
            return state;
    }
}