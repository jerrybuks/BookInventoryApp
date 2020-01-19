import React, {useContext,useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import "./SideNav.css"
import BookContext from '../context/book/bookContext';
import Dashboard from '../dashboard/Dashboard';
import AddInventory from '../addInventory/AddInventory';
import ViewInventories from '../viewInventories/ViewInventories';
import AuthContext from '../context/auth/authContext';
import ViewInventory from '../viewInventory/ViewInventory';
import Menu from './assets/menu.svg'

const SideNav = withRouter(props => <SideNavComponent {...props} />);
    
function SideNavComponent(props) {
    console.log(props)
    const [state, setState] = useState({mode: "none", screenSize : window.screen.width })
    const bookContext = useContext(BookContext); 
    const { getBook, book, books, clearStatus, status } = bookContext;
    const { match, location } = props;
    const { pathname } = location;
    const activeTab = pathname.split('/')[1];

    const authContext = useContext(AuthContext)
    const { logout } = authContext
    const { mode, screenSize } = state;
    const checkScreen = screenSize < 750;
    let val;
    useEffect(() => {
        if(status){
            clearStatus();
        }
        getBook();
        const handleResize = () =>{
            setState({...state, screenSize: window.screen.width})
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
          
        }
    }, [book,status,mode,screenSize]);
    if(!books) return  "loads"
    const bookData = books.reverse()
  console.log("i recahed",pathname)
    switch (pathname) {
        case "/dashboard":
            val = <Dashboard books={bookData} /> 
            break;
        case "/addInventory":
            val = <AddInventory /> 
            break;
        case "/viewInventories":
            val = <ViewInventories  books={bookData}/>
            break;
        case `/viewInventories/${match.params.id}`:
            val = <ViewInventory id={match.params.id} books={bookData}/>
            break;
        default:
            val = "Not found"
            break;
    }
    
    const changeMode = () =>{
        if(checkScreen) {
                setState({...state, mode : (mode == "block") ? "none": "block"})         
        }
    }
    const closeNav = (e) =>{
        if(checkScreen && (mode  === "block")) {
                setState({...state, mode :  "none"})          
        }
    }
    
    console.log(screenSize,mode)
    return (
        <div className="container">
            <div className="ham-container" onClick={changeMode}>
                <span className="ham-menu"></span>
            </div>
            <div className="flex-end" onClick={closeNav}>
            <div className="sideNav" style={{ display: checkScreen ? mode : "block"}} >
                <div onClick={() => props.history.push("/dashboard")} className={activeTab === "dashboard" ? activeTab : ""}>Dashboard</div>
                <div onClick={() => props.history.push("/viewInventories")} className={activeTab === "viewInventories" ? activeTab : ""} >View Inventories</div>
                <div onClick={() => props.history.push("/addInventory")} className={activeTab === "addInventory" ? activeTab : ""} >Add Book</div>
                <div onClick={() => logout()}>Logout</div>
            </div>
           <div className="utils-pd-small sideNav-content">
                {val}
            </div>
            </div>
        </div>

    )
}
export default SideNav