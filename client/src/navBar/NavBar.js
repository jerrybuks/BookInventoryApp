import React from 'react'
import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    return (
        <nav className="nav">
            <ul className="nav-ul">
                <li>logo</li>
                <div className="nav-ul--item2">
                    <li> <Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link> </li>
                </div>
            </ul>
        </nav>
    )
}
