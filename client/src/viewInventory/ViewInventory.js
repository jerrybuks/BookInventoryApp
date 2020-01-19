import React, {useState, useEffect} from 'react'
import "./View|nventory.css"
import Modal from '../common/modal/Modal';
import DeleteInventory from '../deleteInventory/DeleteInventory';
import AddInventory from '../addInventory/AddInventory';
import Edit from "./assets/edit.svg";
import Delete from "./assets/delete.svg";

export default function ViewInventory({books,  id }) {
    const book = books.find(({_id}) => _id === id )
    console.log(book)
    const [state, setState] = useState({ isModalOpen: false, openId: ""})
    const {isModalOpen,openId} = state
    useEffect(() => {
        
        console.log("hello")
    }, [isModalOpen])
    const closeModal = () => {
		setState({
            ...state,
			isModalOpen: false,
		});
	}
    
	// open modal (set isModalOpen, false)
	const openModal = (e) => {
        console.log(e.target.id)
		setState({
            ...state,
            isModalOpen: true,
            openId: e.target.id
		});
    }
    
    
    const { bookTitle, categoryOfBook, NoOfCopies, ISBN, publisher, publicationDate, edition, author, _id} = book

    return (
        <div>
            <div className="flex-end utils-mg-bt-vsmall inventoryIcons">
                <img className="editInventory" src={Edit} onClick={openModal} id="edit"/>
                <img className="deleteInventory" src={Delete} onClick={openModal} id="trash"/>
 				<Modal
					isModalOpen={isModalOpen}
					closeModal={closeModal}
				>
                    {openId === "edit" ? <AddInventory edit={true} bookDetails={book} onCancel={closeModal}/> :  <DeleteInventory bookId={_id} onCancel={closeModal}/> }
				</Modal>
            </div>
             <div className="inventoryDetails ">
                 <div className="inventoryDetails-list">
                     <span>Book Title:</span>
                     <span>{bookTitle}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>Author:</span>
                     <span>{author}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>Book Category:</span>
                     <span>{categoryOfBook}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>Number of copies:</span>
                     <span>{NoOfCopies}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>ISBN:</span>
                     <span>{ISBN}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>publisher:</span>
                     <span>{publisher}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>Publication Date:</span>
                     <span>{publicationDate}</span>
                 </div>
                 <div className="inventoryDetails-list">
                     <span>edition:</span>
                     <span>{edition}</span>
                 </div>
            </div>
        </div>
    )
}
