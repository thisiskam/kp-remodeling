import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCarousel() {
    const [images, setImages] = useState([]);
    const [imageStyles, setImageStyles] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await fetch("/api/portfolio/random-images");
                if (!res.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await res.json();
                setImages(data);

                // Define grid-based positioning
                const rows = 4; // Number of rows
                const cols = 5; // Number of columns
                const gap = 20; // Space between images

                const styles = data.map((_, index) => {
                    const row = Math.floor(index / cols); // Row index
                    const col = index % cols; // Column index

                    return {
                        top: `${row * (220 + gap)}px`, // Space images vertically
                        left: `${col * (220 + gap)}px`, // Space images horizontally
                        zIndex: index, // Keep stacking order
                    };
                });

                setImageStyles(styles);
            } catch (error) {
                console.error(error);
            }
        };

        getImages();
    }, []);

    return (
        <div className="collage-container">
            {/* {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Collage Image ${index + 1}`}
                    className="collage-image"
                    style={{
                        ...imageStyles[index],
                        position: "absolute",
                        transition: "transform 0.4s ease-in-out, z-index 0.1s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.zIndex = 100}
                    onMouseLeave={(e) => e.currentTarget.style.zIndex = imageStyles[index]?.zIndex}
                />
            ))} */}
        </div>
    );
}
