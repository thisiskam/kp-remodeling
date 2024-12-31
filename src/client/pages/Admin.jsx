import PageBanner from "../components/PageBanner"
import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"
import AdminBlogs from "../components/adminBlogs"

export default function Admin () {
    const navigate= useNavigate()
    // will need to change this to an secure route that checks that the localitem token is valid
    const token = localStorage.getItem("token")
 
    function Unauthorized () {
        return (
            <>
                <h1 className="my-4">Unauthorized</h1>
                <p className="">You are are not logged in</p>
                <button className="btn btn-secondary btn-block mb-4 mt-4" onClick={() => (navigate("../login"))}>Login</button>
            </>
        )
    }

    function Authorized () {
        return (
            <>
               <h1 className="my-4">Admin Controls</h1>
               <AdminBlogs />
               <LogoutButton /> 
            </>
        )
    }
    return (
        <>
            <PageBanner />
            <div className="container col-9 justify-content-center align-items-center d-flex flex-column h-100 border border-2 border-dark bg-white moved-up rounded" style={{ zIndex: 9999, position: 'relative'}}>
                {token ? <Authorized /> : <Unauthorized />}
            </div>
        </>
    )
}