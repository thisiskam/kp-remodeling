import React from 'react';
import { Link } from 'react-router-dom'; 


export default function Nav () {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100" style={{zIndex: 9999}}>
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
                        <li className="nav-item fs-4">
                            <Link className="nav-link" to="/portfolio">Portfolio</Link>
                        </li>
                        <li className="nav-item fs-4">
                            <Link className="nav-link" to="/estimate">Estimate</Link>
                        </li>
                        <li className="nav-item fs-4">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
  
