import { Link } from "react-router-dom";

export default function Estimate () {
    return (
        <> 
            <div className="d-flex justify-content-center flex-column">
                <p className="display-3 text-center mt-5">Estimate Page</p>
                <Link className="btn fs-3" to='/'>Home</Link>
            </div>
        </>
    )
}