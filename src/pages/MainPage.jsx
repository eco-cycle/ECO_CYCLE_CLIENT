import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Apis from '../apis/Apis';
import ProgressBar from '../components/MainPage/ProgressBar';

import "../styles/pages/MainPage.scss";
import ProgressStar from "../assets/MainPage/ProgressStar.svg";
import FirstBlock from "../assets/MainPage/Block/firstBlock.svg";
import SecondBlock from "../assets/MainPage/Block/SecondBlock.svg";
import ThirdBlock from "../assets/MainPage/Block/ThirdBlock.svg";
import lastBlock from "../assets/MainPage/Block/lastBlock.svg";
import Transaction from '../components/MainPage/Transaction';
import MyPoint from '../components/MainPage/MyPoint';


const blocks = [
  {
    url: "/loading",
    src: FirstBlock,
  },
  {
    url: "/how",
    src: SecondBlock,
  },
  {
    url: "/collection",
    src: ThirdBlock,
  },
  {
    url: "/shop",
    src: lastBlock,
  },
];

const MainPage = () => {
    const navigate = useNavigate();
    
  useEffect(() => {
    Apis.get("/api/v1/member/new").then((response) => {
      if (response.data.data.new) {
        navigate("/location");
      }
    });
  }, []);

    return (
      <div className="MainPage--Wrapper">
        <div className="MainPage--BackGround" />
        <div className="MainPage--Progress--Box">
          <ProgressBar bgcolor={"#47ABFF"} completed={25} />
          <Transaction bgcolor={"#47ABFF"} completed={6} />
          <MyPoint bgcolor={"#47ABFF"} completed={20000} />
        </div>
        <div className="MainPage--Blocks">
          {blocks.map((block, index) => (
            <div 
              key={index} 
              className="MainPage--Block" 
              style={{ backgroundImage: `url(${block.src})` }}
              onClick={()=>navigate(block.url)}
            />
          ))}
        </div>
      </div>
    );
};

export default MainPage;
