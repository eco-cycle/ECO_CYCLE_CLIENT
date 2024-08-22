import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Loading.scss";

import Loading1 from "../assets/Loading/Loading1.png";
import Loading2 from "../assets/Loading/Loading2.png";
import Loading3 from "../assets/Loading/Loading3.png";
import Loading4 from "../assets/Loading/Loading4.png";

const Loading = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const pages = [
    {
      text: "여러분들의 재활용 점수는 몇 점인가요?",
      image: Loading1,
    },
    {
      text: "올바른 분리 배출을 시작해 보는 건 어떨까요?",
      image: Loading2,
    },
    {
      text: "문 알에 내놓기만 하면 수거해 가요<br />(잘 할수록 포인트도?!)",
      image: Loading3,
    },
    {
      text: "수거된 재활용 자원은 재탄생하여<br />여러분의 곁으로 돌아갑니다!",
      image: Loading4,
    },
  ];

  useEffect(() => {
    // Slide to the current index whenever it changes
    const translateValue = `translateX(-${currentIndex * 100}%)`;
    containerRef.current.style.transform = translateValue;
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

  return (
    <div className="loading-container">
      <div
        className="loading-content"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {pages.map((page, index) => (
          <div className="slide" key={index}>
            <div className="loading-image">
              <img src={page.image} alt="Illustration" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: page.text }} />
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

      <button className="skip-button" onClick={handleSkip}>
        SKIP
      </button>
    </div>
  );
};

export default Loading;
