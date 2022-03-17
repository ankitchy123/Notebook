import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
    }

    const verified = localStorage.getItem('verified');

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">Note</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} ${verified ? "disabled" : ""}`} aria-current="page" to="/">Home</Link>
                    </li>
                </ul>
                {!localStorage.getItem('auth-token') ? <form className="d-flex">
                    <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                    <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
                </form>
                    :
                    <form> <Link className='btn btn-primary mx-2' to="/login" onClick={handleLogout}>Logout</Link></form>
                }
            </div>
        </div>
    </nav>
};
