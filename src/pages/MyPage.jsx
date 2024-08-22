import React, { useEffect, useState } from "react";
import "../styles/pages/MyPage.scss";
import { getInfo } from "../apis/Info/apis";

import noProfile from "../assets/MyPage/noProfile.jpg";
import Notification from "../assets/MyPage/Notification.svg";
import Scrab from "../assets/MyPage/Scrab.svg";
import settings from "../assets/MyPage/settings.svg";
import SubList from "../assets/MyPage/SubList.svg";
import { useNavigate } from "react-router-dom";

const MyPageSettingItem = ({ icon, text, onNavigate }) => (
  <div className="MySettings--Box--Content" onClick={onNavigate}>
    <img src={icon} alt={text} className="MySettings--Box--Icon" />
    {text}
  </div>
);

const MyPage = () => {
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const onNavigate = (url) => {
    navigate(url);
  }
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
      <div className="MyPage--Text">
        eco<span style={{ color: "#47ABFF" }}>cycle</span>을 총 12번
        참여해주셨어요!
      </div>
      <div className="MySettings--Wrapper">
        <div className="MySettings--Box">
          <MyPageSettingItem
            icon={Notification}
            text="공지사항"
            onNavigate={() => onNavigate("/article")}
          />
          <MyPageSettingItem
            icon={Scrab}
            text="관심 목록"
            onNavigate={() => onNavigate("/cart")}
          />
          <MyPageSettingItem
            icon={settings}
            text="회원정보 수정"
            onNavigate={() => onNavigate("/location")}
          />
          <MyPageSettingItem
            icon={SubList}
            text="구매 목록"
            onNavigate={() => onNavigate("/buylist")}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
