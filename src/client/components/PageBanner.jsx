import { useNavigate } from "react-router-dom";

export default function PageBanner({ bannerHeading, bannerSubHeading, logoSrc }) {
    const navigate = useNavigate()


    const handleLogoClick = () => {
        console.log("you clicked it");
        
        navigate('/');
        console.log("it worked");
        
    };

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
            <img
                src={'/white-logo.png' || logoSrc}
                className="position-absolute top-0 start-0 p-2 col-4 col-sm-3 col-md-2 col-lg-1 m-1"
                alt="Logo"
                onClick={handleLogoClick}
                style={{ zIndex: 9999}}
            />
            
            <div className="container text-center">
                <h1 className="display-3 fw-bold">{bannerHeading}</h1>
                <p className="lead fs-4 mt-4 mb-5">
                    {bannerSubHeading}
                </p>
            </div>
        </div>
    );
}