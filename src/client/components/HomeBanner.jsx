import { Link } from "react-router-dom";

export default function HomeBanner() {

  return (
    <>
      <div className="jumbotron jumbotron-background">
        {/* to darken image, edit image and stylings in index.css */}
        <div className="jumbotron-overlay"></div>
        <img
          src={'/white-logo.png' || logoSrc}
          className="position-absolute top-0 start-0 p-2 col-4 col-md-3 col-lg-2 m-1"
          alt="Logo"
          style={{ zIndex: 9999 }}
        />
        <div className="container jumbotron-content">
          <div className="text-white ms-3 ms-md-5 ps-3 ps-md-5">
            <h2 className="fw-light mb-3 mt-5 fs-2 fs-md-4 fs-lg-2">KP Home Remodeling</h2>
            <h1 className="display-4 fw-bold quicksand mb-4 mx-2 fs-1 fs-md-2 fs-sm-3">Redefine Your Space</h1>
            <h3 className="fs-4 fw-light fst-italic mb-4 mx-3">Modern Remodeling That Transforms the Way You Live</h3>
            <Link to="/estimate" className="btn coral-bg text-white btn-lg px-4 mx-5">Get a Quote</Link>
          </div>
        </div>
      </div>
      
    </>
  );
}

