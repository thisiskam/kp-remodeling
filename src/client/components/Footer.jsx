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
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-facebook fa-lg"></i>
            </a> */}
            <a href="https://www.google.com/search?sca_esv=281e988bd194038a&sxsrf=ADLYWIKc3H7vEfqlwBEoaPUATS7D7ic3Aw:1731590681447&uds=ADvngMjcH0KdF7qGWtwTBrP0nt7dFkBLZ55gGyeTF3ustRBQs1qdi7EqRrhRAxaUmd0InasbMm8j4yUkbD9Qqm9oCmfbsRa_wfV9LLRYC3JW-dcIxqHX72Ds8vsFFeto6VMEps5YF66mxKtOQ7F77UyEjxsvj1DtEg&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7qnUMQGTqDjIlYcww0hBuyGQwuMbbDG6sf5khRNzPw4baB1b1JFhzv-KTPBNYUfiCrim_yQ%3D&q=KP+Home+Remodeling+Reviews&sa=X&ved=2ahUKEwj26tr79duJAxUWcaQEHapwCO8Q3PALegQIOxAF&biw=1512&bih=808&dpr=2" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-google fa-lg"></i>
            </a>
            <a href="https://www.instagram.com/kphomeremodelingllc?utm_source=ig_web_button_share_sheet&igsh=MXNtdnloZjIyMzI2MQ==" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p>Certified Contractor by the state of California working in the LA Area</p>
            <p>License #1140011</p>
            <p>Licenced, Bonded and Insured</p>
            <p className="mb-0"><span style={{ cursor: 'pointer' }} onClick={() => navigate('../login')}>&copy;</span> {new Date().getFullYear()} KP Home Remodeling. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};