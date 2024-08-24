import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../../styles/pages/How/HowMain.scss';

import Glass from '../../assets/How/Glass.png';
import Metal from '../../assets/How/Metal.png';
import Paper from '../../assets/How/Paper.png';
import Plastic from '../../assets/How/Plastic.png';
import Vinyl from '../../assets/How/Vinyl.png';
import Styrofoam from '../../assets/How/Styrofoam.png';

const HowMain = () => {
  const navigate = useNavigate();

  const wasteTypes = [
    { name: 'Plastic', image: Glass },
    { name: 'Paper', image: Paper },
    { name: 'Poly', image: Styrofoam },
    { name: 'Vinyl', image: Vinyl },
    { name: 'Glass', image: Plastic },
    { name: 'Metal', image: Metal }
  ];

  const handleButtonClick = (type) => {
    // Navigate to HowDetail with the selected type as state
    navigate(`/how/${type}`, { state: { selectedType: type } });
  };

  return (
    <div className="HowMain--Container">
      <h1 className="HowMain--Title">이건 어떻게 버릴까?</h1>
      <p className="HowMain--Description">
        분리수거 방법이 궁금한 종류를 선택하고 <br/>우리 함께 분리수거 해요
      </p>
      <div className="HowMain--Grid">
        {wasteTypes.map((type, index) => (
          <button
            key={index}
            className="HowMain--Button"
            onClick={() => handleButtonClick(type.name)}
          >
            <img src={`${type.image}`} alt={`${type.name} icon`} className="HowMain--Icon" />
            <span className="HowMain--Label">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HowMain;
