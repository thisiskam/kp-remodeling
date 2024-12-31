import PageBanner from "../components/PageBanner"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login () {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const login = async () => {
        console.log("login triggered");
        
        try {
            const response = await fetch("api/admin/login", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const result = await response.json();
            console.log(result, "login call on the front end result");
            localStorage.setItem("token", result.token)
              if (response.ok) {
                setMessage(result.message)
                setTimeout(() => {
                    navigate("../admin");
              }, 500); 
            } else {
                setMessage("Unauthorized, try again")
            }
        } catch (error) {
           console.error(error, "error handing login attempt")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
      };
    
    return (
        <>
            <PageBanner />
            <div className="container col-10 col-lg-5 col-md-7 col-sm-9 justify-content-center align-items-center d-flex flex-column h-100 border border-2 border-dark bg-white moved-up rounded shadow" style={{ zIndex: 9999, position: 'relative'}}>
                <h1 className="mt-4 mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                {/* Email Input */}
                    <div className="form-outline mb-4">
                        <input
                        type="id"
                        id="idInput"
                        className="form-control"
                        placeholder="ID"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-outline mb-4">
                        <input
                        type="password"
                        id="passwordInput"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block w-100 mb-5 mt-4"
                    >
                        Sign In
                    </button>
                    <p className="text-center mb-4 text-danger">{message}</p>
                </form>
            </div>
        </>
    )
}