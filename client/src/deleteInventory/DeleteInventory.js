import React, {useContext, useEffect} from 'react'
import Button from '../common/button/Button';
import { withRouter } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import BookContext from '../context/book/bookContext';
import Alerts from '../common/alert/Alerts';

const DeleteInventory = withRouter(props => <DeleteInventoryComponent {...props} />);

function DeleteInventoryComponent({onCancel,  bookId : id, history}) {
    console.log(id)
    
    const bookContext = useContext(BookContext); 
    const alertContext = useContext(AlertContext);
    const { status } = bookContext;
    const { setAlert } = alertContext;
    useEffect(() => {
        console.log(status)
        if(status) {
            setAlert("Book succesfully deleted","success")
            console.log(history)
            onCancel()
            history.push('/viewInventories')
        }
        onCancel()
    }, [status])
    const { deleteBook } = bookContext;
    const deleteInvent = () => {
        deleteBook(id)
        
    }
    return (
        <div>
            <div className="align-center utils-mg-bt-vsmall">
            Are you sure you want to delete  Inventory
            </div>
            <div className="align-center">
                <Button name="Yes" color="red" onClick={deleteInvent}/>
                <Button name="No" color="#4285f4" onClick={onCancel} />
            </div>
        </div>
    )
}

export default DeleteInventory
