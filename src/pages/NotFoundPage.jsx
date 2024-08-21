import React from "react";
import { useNavigate } from "react-router-dom";

import '../styles/pages/NotFoundPage.scss';

import backBtn from '../assets/LoginPage/backIcon.svg';
import logo from '../assets/NotFoundPage/logo.svg';

const NotFoundPage = () => {
    const navigate = useNavigate();

  return (
    <div className="NotFound--Wrapper">
      <img src={backBtn} alt="back-btn" className="NotFound--Icon" onClick={()=>navigate('/')}/>
      <div className="NotFound--Main">
        <img src={logo} alt="logo" className="NotFound--Main--Logo" />
        <div className="NotFound--Main--Text">서비스 준비중입니다.</div>
        <div className="NotFound--Main--SubText">
          보다 나은 서비스를 위해 컨텐츠를 준비하고 있습니다.
        </div>
        <div className="NotFound--Main--SubText">
          빠른 시일 내에 찾아뵙겠습니다.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
