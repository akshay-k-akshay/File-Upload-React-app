import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const history = useNavigate();
    function logOut() {
        localStorage.removeItem("token")
        history("/signin");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">Navbar</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="me-auto mb-2 mb-lg-0"></div>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link btn active" aria-current="page" onClick={() => { logOut() }}>LogOut</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar