import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomeCarousel () {
    const nav = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        {
        src: 'https://lh3.googleusercontent.com/p/AF1QipMQ2TY0NIqIDT08-SdMAL1OfIXQPAoM2yjgF9l8=s1360-w1360-h1020-rw',
        alt: 'First slide',
        caption: 'Kitchen Glass Backsplash',
        },
        {
        src: 'https://lh3.googleusercontent.com/p/AF1QipNNtfSWeTPestLPvHmD2NS-frkyx9sN_XXiUFrw=s1360-w1360-h1020-rw',
        alt: 'Second slide',
        caption: 'Steam Shower',
        },
        {
        src: 'https://lh3.googleusercontent.com/p/AF1QipPSTTQIU8C1sLgAdnN6Ix9E18RDRK1a2W4pIDIO=s1360-w1360-h1020-rw',
        alt: 'Third slide',
        caption: 'Kitchen Remodel',
        }
    ];

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner d-flex align-items-end max-height-800-px mt-5">
                        {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                            <img className="d-block w-100" src={image.src} alt={image.alt} onClick={()=> nav('/portfolio')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{image.caption}</h5>
                            </div>
                        </div>
                        ))}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        onClick={() => handleSelect(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        onClick={() => handleSelect((activeIndex + 1) % images.length)}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>
                <div className="align-items-center d-flex flex-column w-100" >
                    <i className="bi bi-chevron-compact-down fs-1 mt-3"></i>
                </div>
        </>
    );


}