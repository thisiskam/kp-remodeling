export default function ProjectShowcase() {
    const projects = [
        {
            title: 'Modern Kitchen Design',
            description: 'A sleek and modern kitchen with cutting-edge appliances and custom cabinetry.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
        {
            title: 'Elegant Living Room',
            description: 'A cozy and elegant living room perfect for family gatherings.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
        {
            title: 'Outdoor Patio Transformation',
            description: 'A stunning outdoor space designed for relaxation and entertainment.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
        {
            title: 'Modern Kitchen Design',
            description: 'A sleek and modern kitchen with cutting-edge appliances and custom cabinetry.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
        {
            title: 'Modern Kitchen Design',
            description: 'A sleek and modern kitchen with cutting-edge appliances and custom cabinetry.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
        {
            title: 'Modern Kitchen Design',
            description: 'A sleek and modern kitchen with cutting-edge appliances and custom cabinetry.',
            images: [
                'bathroom-one.jpg',
                'bathroom-two.jpg',
                'bathroom-three.jpg',
            ],
        },
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Our Projects</h2>
            <div className="row">
                {projects.map((project, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div
                                id={`carousel-${index}`}
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    {project.images.map((image, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className={`carousel-item ${
                                                imgIndex === 0 ? 'active' : ''
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                className="d-block w-100"
                                                alt={`Slide ${imgIndex + 1} of ${project.title}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel-${index}`}
                                    data-bs-slide="prev"
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#carousel-${index}`}
                                    data-bs-slide="next"
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text">{project.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}