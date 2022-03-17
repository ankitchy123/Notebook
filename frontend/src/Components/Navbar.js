import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import {
//     BrowserRouter as Router,
//     Switch
// } from "react-router-dom";


export const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('verified');
    }
    const [name, setName] = useState(null);

    const getUserData = async () => {
        const response = await fetch('https://i--notebook.herokuapp.com/api/auth/getuser', {
            // const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setName(json.name)
    }

    if (localStorage.getItem("auth-token")) {
        getUserData();
    }

    // getUserData();

    const verified = localStorage.getItem('verified');

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">iNote</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} ${verified ? "disabled" : ""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} ${verified ? "disabled" : ""}`} to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('auth-token') ? <form className="d-flex">
                    <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                    <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
                </form> : <ul style={{ marginBottom: "0" }}><li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{name}</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </li>
                </ul>}
                {/* <form> <Link className='btn btn-primary mx-2' to="/login" onClick={handleLogout}>Logout</Link></form> */}
            </div>
        </div>
    </nav>
};
