import React, {useContext} from 'react'
import { withRouter } from 'react-router-dom';
import "./SideNav.css"
import Dashboard from '../dashboard/Dashboard';
import AddInventory from '../addInventory/AddInventory';
import ViewInventories from '../viewInventories/ViewInventories';
import AuthContext from '../context/auth/authContext';

const SideNav = withRouter(props => <SideNavComponent {...props} />);

function SideNavComponent(props) {
    const { pathname } = props.location;
    const activeTab = pathname.split('/')[1];

    const authContext = useContext(AuthContext)
    const { logout } = authContext
    let val;

    if(pathname === "/dashboard") {
        val = <Dashboard /> 
    } else if(pathname === "/addInventory") {
        val = <AddInventory />
    } else if (pathname === "/viewInventories"){
        val =<ViewInventories />
    } else {
        val = "Not found"
    }
    return (
        <div className="container">
            <div className="sideNav">
                <div onClick={() => props.history.push("/dashboard")} className={activeTab === "dashboard" ? activeTab : ""}>Dashboard</div>
                <div onClick={() => props.history.push("/viewInventories")} className={activeTab === "viewInventories" ? activeTab : ""} >View Inventories</div>
                <div onClick={() => props.history.push("/addInventory")} className={activeTab === "addInventory" ? activeTab : ""} >Add Book</div>
                <div onClick={() => logout()}>Logout</div>
            </div>
           <div className="utils-pd-small sideNav-content">
                {val}
            </div>
        </div>

    )
}
export default SideNav