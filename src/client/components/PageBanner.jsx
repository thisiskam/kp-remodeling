import { Link } from "react-router-dom";

export default function PageBanner({ bannerHeading, bannerSubHeading, logoSrc }) {
    return (
        <div
            className="jumbotron jumbotron-fluid text-white bg-dark position-relative"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'difference',
                padding: '3rem 0rem',
            }}
        >
            {/* Small Logo in Top Left Corner */}
            <Link to='/'><img
                src='/white-logo.png'
                className="position-absolute top-0 start-0 p-2"
                alt="Logo"
                style={{
                    width: '10%', 
                    height: 'auto',
                    margin: '1.5%'
                }}
            /></Link>
            
            <div className="container text-center">
                <h1 className="display-3 fw-bold">{bannerHeading}</h1>
                <p className="lead fs-4 mt-4 mb-5">
                    {bannerSubHeading}
                </p>
            </div>
        </div>
    );
}