import { useNavigate } from "react-router-dom";

export default function () {
    const nav = useNavigate()
    const containerTitle = "Find Us On"
    const googleLogo = {img: "google.svg", alt: "google logo"}

    return (
        <>
            <div className="container bg-dark rounded col-md-7 col-10 mt-5">
                <div className="row d-flex justify-content-center">
                    <h1 className="display-5 text-white text-center">{containerTitle}<img style={{height: "3em"}} src={googleLogo.img} alt={googleLogo.alt}/></h1>
                    <a className="btn btn-light col-3 rounded mb-5 fs-5" href="https://www.google.com/search?sca_esv=281e988bd194038a&sxsrf=ADLYWIKc3H7vEfqlwBEoaPUATS7D7ic3Aw:1731590681447&uds=ADvngMjcH0KdF7qGWtwTBrP0nt7dFkBLZ55gGyeTF3ustRBQs1qdi7EqRrhRAxaUmd0InasbMm8j4yUkbD9Qqm9oCmfbsRa_wfV9LLRYC3JW-dcIxqHX72Ds8vsFFeto6VMEps5YF66mxKtOQ7F77UyEjxsvj1DtEg&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7qnUMQGTqDjIlYcww0hBuyGQwuMbbDG6sf5khRNzPw4baB1b1JFhzv-KTPBNYUfiCrim_yQ%3D&q=KP+Home+Remodeling+Reviews&sa=X&ved=2ahUKEwj26tr79duJAxUWcaQEHapwCO8Q3PALegQIOxAF&biw=1512&bih=808&dpr=2">
                        Lets Go!
                    </a>
                </div>
            </div>
        </>
    )
}  