import PageBanner from "../components/PageBanner"
import { useNavigate } from "react-router-dom"

export default function Admin () {
    const navigate= useNavigate()
    return (
        <>
            <PageBanner />
            <div className="container col-6 justify-content-center align-items-center d-flex flex-column h-100 border border-2 border-dark bg-white moved-up rounded" style={{ zIndex: 9999, position: 'relative'}}>
                <h1 className="my-2">Admin Controls</h1>
                <button className="btn btn-dark my-2" onClick={() => navigate('../')}>
                    Logout
                </button>  
            </div>
        </>
    )
}