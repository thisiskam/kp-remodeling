import React from 'react';
import { Link } from 'react-router-dom'; 


export default function Nav () {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
            <div className="container-fluid">
                <button
                    className="navbar-toggler ms-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav text-end ms-auto">
                        <li className="nav-item fs-5">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
  
