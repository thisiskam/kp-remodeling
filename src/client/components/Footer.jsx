import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Footer Links */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <ul className="list-unstyled">
              <li>
                <a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-12 col-md-6 text-md-end">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-google fa-lg"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0"><span style={{ cursor: 'pointer' }} onClick={() => navigate('../login')}>&copy;</span> {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <a href="https://www.vecteezy.com/free-vector/oceanside">Oceanside Vectors by Vecteezy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};