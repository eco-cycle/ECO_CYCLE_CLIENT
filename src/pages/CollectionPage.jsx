import React from 'react';
import '../styles/pages/CollectionPage.scss'

import backIcon from '../assets/LoginPage/backIcon.svg';
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
    const navigate = useNavigate();

    return (
      <>
        <div className="Collection-Wrapper">
          <div className="Collection--Header">
            <img
              src={backIcon}
              alt="back-btn"
              className="Collection--BackIcon"
              onClick={() => navigate("/")}
            />
            <div className="Collection--Header--Text">자원거래</div>
          </div>
          <div className="Collection--Create--Btn" onClick={()=>navigate("/create")}>
            <span style={{fontSize: '25px', fontWeight: '700'}}>+</span>
            &nbsp;자원 등록하기
          </div>
        </div>
      </>
    );
};

export default CollectionPage;