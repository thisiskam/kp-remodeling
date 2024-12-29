import PageBanner from "../components/PageBanner"
import { useNavigate } from "react-router-dom"

export default function Login () {
    const navigate = useNavigate()
    return (
        <>
            <PageBanner />
            <div className="container col-10 col-lg-5 col-md-7 col-sm-9 justify-content-center align-items-center d-flex flex-column h-100 border border-2 border-dark bg-white moved-up rounded shadow" style={{ zIndex: 9999, position: 'relative'}}>
                <h1 className="mt-4 mb-4">Login</h1>
                <form>
                {/* Email Input */}
                    <div className="form-outline mb-4">
                        <input
                        type="id"
                        id="idInput"
                        className="form-control"
                        placeholder="ID"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-outline mb-4">
                        <input
                        type="password"
                        id="passwordInput"
                        className="form-control"
                        placeholder="Password"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block w-100 mb-5 mt-4"
                        onClick={() => navigate('../admin')}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </>
    )
}