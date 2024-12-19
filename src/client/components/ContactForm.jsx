import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    jobType: '',
    email: '',
    comments: '',
  });

  // changes items on form as data is entered
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // refreshes the form after a failed attempt
  const refreshButton = () => {
    setFailMessage(false);
    setFormData({
      name: '',
      phone: '',
      jobType: '',
      email: '',
      comments: '',
    });
  };

  //sends form via emailJS to companies email address on submission
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_co5r8ci',
        'template_zeycg4i',
        formData,
        'mBAKcsfAqJGMLxTP',
      )
      .then(
        (result) => {
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
            setFormData({
              name: '',
              phone: '',
              jobType: '',
              email: '',
              comments: '',
            });
          }, 5000);
        },
        (error) => {
          console.error(error.text);
          setFailMessage(true);
        },
      );
  };

  return (
    <>
      <div  className="card shadow-lg p-4 w-100">
        <h3 className="text-center mb-4">Tell Us About Your Project</h3>
        <form onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="phone">Cell Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>


          <div className="form-group mb-3">
            <label htmlFor="jobType">Type of Project:</label>
            <input
              type="text"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="comments">Project Details:</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="form-control"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send
          </button>
        </form>
      </div>

      {successMessage && (
        <div
          className="position-fixed top-50 start-50 translate-middle bg-dark text-white p-4 rounded shadow-lg"
          style={{ zIndex: 1050 }}
        >
          <h4 className="text-center">Message Sent!</h4>
          <p className="text-center mb-0">
            Thank you for submitting your details.
          </p>
        </div>
      )}

      {failMessage && (
        <div className="position-fixed top-50 start-50 translate-middle bg-dark text-white p-4 rounded shadow-lg"
          style={{ zIndex: 1050 }}>
            <h4 className="text-center">Unable To Submit</h4>
            <p className="text-center mb-0">
            Please make sure all boxes are properly filled out.
            </p>
            <button type="submit" className="btn btn-light w-100 mt-4" onClick={refreshButton}>
            Try Again
            </button>
        </div>
      )}
    </>
  );
}
