import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Apis from "../apis/Apis"

import Kakao from "../assets/LoginPage/Kakao.svg";

import '../styles/pages/LoginPage.scss';


const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      sessionStorage.clear()
    },[])
    useEffect(() => {
      const handleSocialLogin = async () => {
        const params = new URL(document.URL).searchParams;
        const code = params.get("code");

        if (code) {
          const response = await Apis.post(`/api/v1/auth/kakao`, {
            authorizationCode: code,
          });
          sessionStorage.setItem("accessToken", response.data.data.accessToken);
          sessionStorage.setItem(
            "refreshToken",
            response.data.data.refreshToken
          );
          navigate("/");
        }
      };
      handleSocialLogin();
    }, [navigate]);

    const handleLogin = () => {
      window.location.href = process.env.REACT_APP_KAKAO_LOGIN_URL;
    };

    return (
      <div className="LoginPage--Wrapper">
        <div className="LoginPage--TextBox">
          <div>
            eco<span style={{ color: "#47ABFF" }}>cycle</span>은 새활용 자원
          </div>
          <div>선순환 거래 플랫폼입니다.</div>
        </div>
        <img
          src={Kakao}
          alt="kakao-login-btn"
          className="LoginPage--Login--Btn"
          onClick={() => handleLogin()}
        />
      </div>
    );
};

export default LoginPage;