import React, { useEffect, useState } from 'react';
import { getInfo, updateInfo } from '../apis/Info/apis';
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from 'react-router-dom';

import "../styles/pages/LocationPage.scss";

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const LocationPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (data) => {
    setLocation(data.address);
    setIsModalOpen(false);
  };

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 이벤트 객체의 기본 동작을 막음
    // 비동기 작업을 기다림
    await updateInfo(location);
    // 정보 업데이트 후에 이동
    navigate("/info");
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await getInfo(); // getInfo 호출
      if (info) {
        setLocation(info.location); // 위치 상태 설정
      }
    };

    fetchInfo(); // fetchInfo 실행
  }, []);

  return (
    <div className="Input--Wrapper">
      <div className="Input--Circle">1</div>
      <div className="Input--TextBox">
        <div>내가 사는 곳의</div>
        <div>
          <span style={{ color: "#47ABFF", fontWeight: "700" }}>
            주소를 입력
          </span>{" "}
          해주세요!
        </div>
      </div>
      <div className="InputLocation--Input--Box">
        <input type="text" className="InputLocation--Input" value={location} />
        <button
          className="InputLocation--Input--Button"
          onClick={handleSearchClick}
        >
          검색
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}

      <div className="InputLocation--Location--TextBox">
        <div className="InputLocation--Location--TextBox--Title">입력예시</div>
        <div>도로명 예) 도산대로8길 23, 권광로373</div>
        <div>동주소 예) 연희동35-7</div>
        <div>건물명 예) 강남역 쉐르빌</div>
      </div>
      <button
        disabled={!location}
        style={{ backgroundColor: !location ? "lightgray" : "" }}
        className="Input--Button"
        onClick={onSubmit}
      >
        다음
      </button>
    </div>
  );
};

export default LocationPage;
