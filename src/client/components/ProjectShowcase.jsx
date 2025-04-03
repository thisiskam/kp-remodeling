import { useEffect, useState } from "react";

export default function ProjectShowcase() {
    const [projects, setProjects] = useState([])

    useEffect (() => {
        const getPortfolios = async () => {
            try {
                const res = await fetch("/api/portfolio")
                const data = await res.json()
                setProjects(data)
            } catch (error) {
                console.error(error);
            }
        }
        getPortfolios()
    },[])

    return (
        <div className="container moved-up">
            <div className="row">
                {projects && projects.map((project) => (
                    <div key={project.id} className="col-md-4 mb-4">
                        <div className="card h-100 border-0 mb-4">
                            <div
                                id={`carousel-${project.id}`}
                                className="carousel slide"
                            >
                                <div className="carousel-inner">
                                    {project.images.map((image, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className={`carousel-item ${
                                                imgIndex === 0 ? 'active' : ''
                                            }`}
                                        >
                                            <img src={image}
                                                className="d-block w-100 rounded"
                                                alt={`Slide ${imgIndex + 1} of ${project.title}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel-${project.id}`}
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
                                    data-bs-target={`#carousel-${project.id}`}
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
                                <p className="card-text">{project.work_description}</p>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
        </div>
    );
}