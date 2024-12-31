//import some stuff
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));


  async function handleClick() {
    try {
      setToken(localStorage.removeItem("token"));
      console.log(
        "logout function, there should be no token here now",
        localStorage.getItem("token")
      );
      navigate("/");
    } catch (error) {
      console.error("error in logout", error);
    }
  }
  return (
    <>
      {token && <button onClick={handleClick} className="btn btn-secondary btn-block mb-5 mt-4">LOGOUT</button>}
    </>
  );
}
