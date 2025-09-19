import { useEffect, useState } from "react";


export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([])
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${API_URL}/api/testimonials`);
                  const data = await res.json();
                  
                  setTestimonials(data);
                  console.log("fetched testimonials successfully");
            } catch (error) {
                console.error(error)
            }  
        };
        fetchTestimonials();
    },[])

    console.log(testimonials);
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">What Our Clients Say</h2>
            <div className="row">
                {testimonials && testimonials.map((testimonial, index) => (
                    <div key={index} className="col-md-4 mb-4" onClick={() => window.open(testimonial.type_link, "_blank")}>
                        <div className="card h-100 text-center">
                            <img
                                src={testimonial.type_image_url}
                                className="rounded-circle mx-auto mt-3"
                                alt={testimonial.type_name}
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div className="card-body">
                                <p className="card-text">"{testimonial.review}"</p>
                                <h5 className="card-title">{testimonial.customer}</h5>
                                <h6 className="fw-light text-secondary mt-2">{new Date(testimonial.review_date).toLocaleString("en-US", {
                                       month: "short",
                                       year: "numeric"})}
                                </h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
