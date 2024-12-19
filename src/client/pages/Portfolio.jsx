import Footer from '../components/Footer';
import ProjectShowcase from '../components/ProjectShowcase';
import PageBanner from '../components/PageBanner';
import Testimonials from '../components/Testimonials';

export default function Portfolio() {
    const bannerHeading = "Our Work"
    const bannerSubHeading = "Discover our exceptional projects and the transformations we have achieved."
    return (
        <>
            <PageBanner bannerHeading={bannerHeading} bannerSubHeading={bannerSubHeading}/>
            <ProjectShowcase />
            <Testimonials />
            <Footer />
        </>
    );
}