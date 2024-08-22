import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/Loading.scss";

// Import the images
import Loading1 from '../assets/Loading/Loading1.png';
import Loading2 from '../assets/Loading/Loading2.png';
import Loading3 from '../assets/Loading/Loading3.png';
import Loading4 from '../assets/Loading/Loading4.png';

const Loading = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const pages = [
        {
            text: '여러분들의 재활용 점수는 몇 점인가요?',
            image: Loading1,
        },
        {
            text: '올바른 분리 배출을 시작해 보는 건 어떨까요?',
            image: Loading2,
        },
        {
            text: '문 알에 내놓기만 하면수거해가요<br />(잘 할수록 포인트도?!)',
            image: Loading3,
        },
        {
            text: '수거된 재활용 자원은 재탄생하여<br />여러분의 곁으로 돌아갑니다!',
            image: Loading4,
        }
    ];

    const handleNavigation = (event) => {
        const { clientX } = event;

        // Determine the width of the screen
        const screenWidth = window.innerWidth;

        // If the click is on the left half of the screen, go to the previous page
        if (clientX < screenWidth / 2) {
            handlePrevious();
        }
        // If the click is on the right half of the screen, go to the next page
        else {
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

    return (
        <div className="loading-container" onClick={handleNavigation}>
            <div className="loading-content">
                <div className="loading-image">
                    <img src={pages[currentIndex].image} alt="Illustration" />
                </div>

                <p dangerouslySetInnerHTML={{ __html: pages[currentIndex].text }} />

                <div className="pagination">
                    {pages.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                        ></span>
                    ))}
                </div>

                <button className="skip-button" onClick={handleSkip}>SKIP</button>
            </div>
        </div>
    );
};

export default Loading;
