export default function Mission () {
    const missionTitle = "Your Project is Important"
    const missionBodyParagraphOne = "Transform your living space with our expert residential remodeling services. Whether you are looking to modernize your kitchen, expand your living room, or create a luxurious master suite, our skilled team is here to bring your vision to life. We specialize in crafting beautiful, functional spaces that enhance the value of your home and reflect your unique style. From initial design to final finishing touches, we handle every aspect of the project with meticulous attention to detail, ensuring a seamless and stress-free remodeling experience."
    const missionBodyParagraphTwo = "At Crown Point, we understand that your home is more than just a place to live—it's where memories are made. That is why we take the time to listen to your needs and work closely with you to create a space that is tailored to your lifestyle. Our commitment to quality craftsmanship and customer satisfaction means you can trust us to deliver exceptional results, on time and within budget. Let us help you turn your dream home into a reality with our comprehensive remodeling services."
    
    return (
        <>  
            <div className="d-flex align-items-center flex-column">
                <i class="bi bi-chevron-compact-down fs-1 "></i>
                <div className="container-fluid d-flex flex-column align-items-center mt-5">
                    <h1 className="display-5 text-center mt-5 text-secondary mb-5">{missionTitle}</h1>
                    <div className="container-fluid w-75 mt-2 mx-lg-5 px-lg-5 px-0">
                        <div className="row">
                            <div className="col-lg-8 col-12 p-3 d-flex align-items-center">
                                <p className="text-lg-end text-center fs-5">{missionBodyParagraphOne}<br/><br/>{missionBodyParagraphTwo}</p>
                            </div>
                            <div className="col-lg-4 col-12">
                                <img className="img-fluid rounded mt-3 p-lg-0 px-5" src="mission-img.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <i class="bi bi-chevron-compact-down fs-1 mt-3"></i>
            </div>
        </>
    )
}