export default function Testimonials() {
    const testimonials = [
        {
            name: 'John Doe',
            feedback: 'The team did an amazing job on our kitchen remodel. Highly recommend!',
            img: '/google.svg',
        },
        {
            name: 'Jane Smith',
            feedback: 'Our living room looks fantastic! Thank you for your hard work.',
            img: '/angi.svg',
        },
        {
            name: 'Michael Brown',
            feedback: 'The patio transformation is beyond our expectations. Great work!',
            img: '/google.svg',
        },
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">What Our Clients Say</h2>
            <div className="row">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <img
                                src={testimonial.img}
                                className="rounded-circle mx-auto mt-3"
                                alt={testimonial.name}
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div className="card-body">
                                <p className="card-text">"{testimonial.feedback}"</p>
                                <h5 className="card-title">{testimonial.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
