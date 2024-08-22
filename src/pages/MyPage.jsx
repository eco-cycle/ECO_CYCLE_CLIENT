import React, { useEffect, useState } from 'react';
import '../styles/pages/MyPage.scss';
import { getInfo } from '../apis/Info/apis';

import noProfile from '../assets/MyPage/noProfile.jpg';
import Notification from "../assets/MyPage/Notification.svg";
import Scrab from "../assets/MyPage/Scrab.svg";
import settings from "../assets/MyPage/settings.svg";
import SubList from "../assets/MyPage/SubList.svg";


const MyPage = () => {
    const [info, setInfo] = useState();

    useEffect(() => {
        const fetchInfo = async () => {
        const info = await getInfo(); // getInfo 호출
        if (info) {
            setInfo(info); // 위치 상태 설정
        }
        };

        fetchInfo(); // fetchInfo 실행
    }, []);

    return (
      <div className="MyPage--Wrapper">
        <div className="MyProfile-Wrapper">
          <img
            src={info && (info.imageUrl ? info.imageUrl : noProfile)}
            alt="profile-image"
            className="MyPage--Image"
          />
          <div className="MyPage--Info">
            <span style={{ color: "#47ABFF" }}>환경운동가</span>
            <div>{info && info.nickname}님</div>
          </div>
        </div>
        <div>

        </div>
      </div>
    );
};

export default MyPage;