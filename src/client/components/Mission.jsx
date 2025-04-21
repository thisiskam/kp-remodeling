export default function Mission () {
    const missionTitle = "Your Project is Important"
    const missionBodyParagraph = "Transform your living space with our expert residential remodeling services. Whether you are looking to modernize your kitchen, expand your living room, or create a luxurious master suite, our skilled team is here to bring your vision to life. We specialize in crafting beautiful, functional spaces that enhance the value of your home and reflect your unique style. From initial design to final finishing touches, we handle every aspect of the project with meticulous attention to detail, ensuring a seamless and stress-free remodeling experience."
    return (
        <>  
            <div className="d-flex align-items-center flex-column">
                <i className="bi bi-chevron-compact-down fs-1 "></i>
                <div className="container-fluid d-flex flex-column align-items-center mt-5">
                    <h1 className="display-5 text-center mt-5 text-secondary mb-5">{missionTitle}</h1>
                    <div className="container-fluid w-75 mt-2 mx-lg-5 px-lg-5 px-0">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-6 col-lg-7 col-12 p-3 d-flex align-items-center">
                                <p className="text-lg-start text-center fs-5">{missionBodyParagraph}</p>
                            </div>
                            <div className="col-xl-6 col-lg-5 col-md-8 col-sm-9 col-12 d-flex justify-content-center align-items-center">
                                <img className="img-fluid rounded mt-3 p-lg-0 px-5" src="public/remodel-cartoon.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <i className="bi bi-chevron-compact-down fs-1 mt-3"></i>
            </div>
        </>
    )
}