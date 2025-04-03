import PageBanner from '../components/PageBanner';

export default function PrivacyPolicy() {
    const bannerHeading = "Privacy Policy"
    const bannerSubHeading = ""
    return (
        <>
            <PageBanner bannerHeading={bannerHeading} bannerSubHeading={bannerSubHeading}/>
            <div className='d-flex justify-content-center'>
            <div className='w-75 moved-up-more bg-white rounded p-3 border' style={{position: 'relative', zIndex: 9999}}>
                <p><strong>Effective Date:  </strong>April 3rd 2025</p>

                <h4>1. Introduction</h4>
                <p>Kp Home Remodeling values your privacy. This Privacy Policy explains how we collect, use, and protect the personal information you provide when you submit a contact form on our website.</p>

                <h4>2. Information We Collect</h4>
                <p>When you fill out the contact form, we may collect the following information:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Any message or details you provide</li>
                </ul>

                <h4>3. How We Use Your Information</h4>
                <p>We use the information you provide to:</p>
                <ul>
                    <li>Respond to your inquiries</li>
                    <li>Communicate with you regarding your request</li>
                    <li>Improve our services and website experience</li>
                </ul>

                <h4>4. Data Protection & Security</h4>
                <p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, or loss. However, no method of transmission over the Internet is completely secure.</p>

                <h4>5. Sharing of Information</h4>
                <p>We do not sell, trade, or rent your personal information. We may share it with service providers who assist us in operating our website or conducting our business, subject to confidentiality agreements.</p>

                <h4>6. Cookies & Tracking Technologies</h4>
                <p>Our website may use cookies or similar tracking technologies to enhance user experience and analyze website traffic. You can control cookie preferences through your browser settings.</p>

                <h4>7. Third-Party Links</h4>
                <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies before submitting any information.</p>

                <h4>8. Your Rights & Choices</h4>
                <p>You have the right to:</p>
                <ul>
                    <li>Request access to the personal data we hold about you</li>
                    <li>Request corrections or deletion of your data</li>
                    <li>Withdraw consent for data processing where applicable</li>
                </ul>
                <p>To exercise these rights, please contact us at <a className="text-secondary text-decoration-underline" href="mailto:Kphomeremodeling@outlook.com">Kphomeremodeling@outlook.com</a>.</p>

                <h4>9. Changes to This Privacy Policy</h4>
                <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.</p>

                <h4>10. Contact Us</h4>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p><strong>KP Home Remodeling LLC</strong></p>
                <p>Email: <a className="text-secondary text-decoration-underline" href="mailto:Kphomeremodeling@outlook.com">Kphomeremodeling@outlook.com</a></p>
            </div>
            </div>
        </>
    );
}