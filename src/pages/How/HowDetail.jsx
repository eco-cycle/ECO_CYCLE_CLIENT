import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/pages/How/HowDetail.scss'; 

import glass001 from '../../assets/How/glass/001.png';
import glass002 from '../../assets/How/glass/002.png';
import glass003 from '../../assets/How/glass/003.png';

import metal001 from '../../assets/How/metal/001.png';
import metal002 from '../../assets/How/metal/002.png';
import metal003 from '../../assets/How/metal/003.png';

import paper001 from '../../assets/How/paper/001.png';
import paper002 from '../../assets/How/paper/002.png';
import paper003 from '../../assets/How/paper/003.png';
import paper004 from '../../assets/How/paper/004.png';

import plastic001 from '../../assets/How/plastic/001.png';
import plastic002 from '../../assets/How/plastic/002.png';
import plastic003 from '../../assets/How/plastic/003.png';

import poly001 from '../../assets/How/poly/001.png';
import poly002 from '../../assets/How/poly/002.png';
import poly003 from '../../assets/How/poly/003.png';

import vinyl001 from '../../assets/How/vinyl/001.png';
import vinyl002 from '../../assets/How/vinyl/002.png';
import vinyl003 from '../../assets/How/vinyl/003.png';

const HowDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedType } = location.state || {};
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    // Define the pages based on the selectedType
    const typeToPages = {
        Plastic: [
            { image: plastic001 }, 
            { image: plastic002 }, 
            { image: plastic003 }
        ],
        Paper: [
            { image: paper001 }, 
            { image: paper002 }, 
            { image: paper003 }, 
            { image: paper004 }
        ],
        Poly: [
            { image: poly001 }, 
            { image: poly002 }, 
            { image: poly003 }
        ],
        Vinyl: [
            { image: vinyl001 }, 
            { image: vinyl002 }, 
            { image: vinyl003 }
        ],
        Glass: [
            { image: glass001 }, 
            { image: glass002 }, 
            { image: glass003 }
        ],
        Metal: [
            { image: metal001 }, 
            { image: metal002 }, 
            { image: metal003 }
        ]
    };

    // Get the pages array for the selected type
    const pages = typeToPages[selectedType] || [];

    useEffect(() => {
        const translateValue = `translateX(-${currentIndex * 100}%)`;
        if (containerRef.current) {
            containerRef.current.style.transform = translateValue;
        }
    }, [currentIndex]);

    const handleTouchStart = (event) => {
        containerRef.current.startX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - containerRef.current.startX;

        if (deltaX > 50) {
            handlePrevious();
        } else if (deltaX < -50) {
            handleNext();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < pages.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSkip = () => {
        navigate("/");
    };

    if (pages.length === 0) {
        return <p>No images available for this category.</p>;
    }

    return (
        <div className="HowDetail-container">
            <div
                className="HowDetail-content"
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {pages.map((page, index) => (
                    <div className="slide" key={index}>
                        <div className="HowDetail-image">
                            <img src={page.image} alt={`Slide ${index + 1}`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {pages.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                    ></span>
                ))}
            </div>

            <button
                className={`skip-button ${currentIndex === pages.length - 1 ? "complete" : ""}`}
                onClick={handleSkip}
            >
                {currentIndex === pages.length - 1 ? "완료" : "SKIP"}
            </button>
        </div>
    );
};

export default HowDetail;
