import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCarousel() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/random-images`);
                if (!res.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error(error);
            }
        };

        getImages();
    }, []);

    return (
        <div className="container py-4 px-4 align-items-center d-flex flex-column my-5">
            <h1 className="display-5 mb-5 text-secondary text-center">Check out Some Of Our Past Work</h1>
            <div className="row g-3">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="col-6 col-sm-6 col-md-3 col-lg-3"
                        onClick={() => navigate(`/portfolio`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="hover-grow rounded shadow-sm overflow-hidden">
                            <img
                                src={img}
                                alt={`portfolio-${index}`}
                                className="img-fluid"
                                style={{
                                    height: "120px",
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .hover-grow {
                    transition: transform 0.3s ease;
                }

                .hover-grow:hover {
                    transform: scale(1.1);
                    z-index: 2;
                }
            `}</style>
            <i className="bi bi-chevron-compact-down fs-1 mt-5"></i>
        </div>
    );
}