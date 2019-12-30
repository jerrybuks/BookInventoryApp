import React, { useState, useEffect, useContext } from 'react'
import "./AddInventory.css"
import { set } from 'mongoose'
import AuthContext from '../context/auth/authContext'
import AlertContext from '../context/alert/alertContext'
import BookContext from '../context/book/bookContext'
import Alerts from '../common/alert/Alerts'

export default function AddInventory(props) {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const bookContext = useContext(BookContext)

    const { addBook, book, error, clearBookState } = bookContext;
    const { setAlert } = alertContext;
    console.log(bookContext)
    useEffect(() => {
        if (book) {
            setAlert(book, "success")
            clearBookState()
        }
        if (error) {
            setAlert(error, 'danger')
            clearBookState()
        }
    }, [book, error])

    console.log(authContext)
    const { user: { user: { _id } } } = authContext
    const [state, setState] = useState({
        bookTitle: "",
        categoryOfBook: "non-fiction",
        ISBN: "",
        author: "",
        edition: "",
        NoOfCopies: 1,
        publisher: "",
        publicationDate: "",
    })
    onchange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }

    onsubmit = (e) => {
        e.preventDefault()
        const bookData = {
            ...state,
            user: _id
        }
        console.log(bookData)
        addBook(bookData)
    }
    const { bookTitile, categoryOfBook, ISBN, author, edition, NoOfCopies, publisher, publicationDate } = state
    return (
        <div className="form-inventory">
            <Alerts />
            <form>
                <h3 className="form-inventory__header">Add Inventory</h3>
                <fieldset className="form-inventory__body">
                    <div>
                        <label htmlFor="bookTitle"> Book title :</label>
                        <input id="bookTitle" name="bookTitle" type="text" value={bookTitile} onChange={onchange} required />
                    </div>
                    <div>
                        <label htmlFor="categoryOfBook"> Category of Book :</label>
                        <select id="categoryOfBook" name="categoryOfBook"  value={categoryOfBook} onChange={onchange} required>
                            <option value="fiction">fiction( e.g novel)</option>
                            <option value="non-fiction">non-fiction(e.g text-books)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ISBN">ISBN : </label>
                        <input id="ISBN" name="ISBN" type="text" value={ISBN} onChange={onchange} pattern=".{13}" required />
                    </div>
                    <div>
                        <label htmlFor="author"> Author :</label>
                        <input id="author" name="author" type="text" value={author} onChange={onchange} required />
                    </div>
                    <div>
                        <label htmlFor="edition"> Edition :</label>
                        <input id="edition" name="edition" type="text" value={edition} onChange={onchange} required />
                    </div>
                    <div>
                        <label htmlFor="NoOfCopies"> Number of Copies :</label>
                        <input id="NoOfCopies" name="NoOfCopies" type="number" min="1" value={NoOfCopies} onChange={onchange} required />
                    </div>
                    <div>
                        <label htmlFor="publisher"> Publisher :</label>
                        <input id="publisher" name="publisher" type="text" value={publisher} onChange={onchange} required />
                    </div>
                    <div>
                        <label htmlFor="publicationDate"> Publication Date :</label>
                        <input id="publicationDate" name="publicationDate" type="date" value={publicationDate} onChange={onchange} required />
                    </div>
                    <div className="align-center" ><input className="form-inventory__body-submitBtn" type="submit" /></div>
                </fieldset>
            </form>
        </div>
    )
}
