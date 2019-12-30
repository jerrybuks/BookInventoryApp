import React from 'react'
import { Link } from "react-router-dom";

export default function FormNavBar() {
    return (
        <nav className="nav">
                <ul className="nav-ul">
                    <Link to="/"><li style={{ color : '#fff' }}>logo</li></Link>
                </ul>
            </nav>
    )
}
