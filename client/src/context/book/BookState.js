import React, { useReducer } from "react";
import axios from "axios"
import BookContext from "./bookContext"
import bookReducer from "./bookReducer"
import { ADD_BOOK, BOOK_ERROR, CLEAR_BOOK } from "../types"

export default function BookState(props) {
    const initialState = {
        book: null,
        error: null
    }
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
const [state, dispatch] = useReducer(bookReducer, initialState)

const addBook = async formData => {
    try {
        console.log("helo......", formData)
        const response  = await axios.post("/api/books/", formData, config)
        console.log(response)
        dispatch({
            type: ADD_BOOK,
            payload : response.data.message
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type : BOOK_ERROR,
            payload : error.response.data.message
        })
    }
}

const clearBookState = () => { dispatch({ type: CLEAR_BOOK})}
    return (
        <BookContext.Provider value={{
            book : state.book,
            error: state.error,
            addBook,
            clearBookState
        }}>
            {props.children}
        </BookContext.Provider>
    )
}
