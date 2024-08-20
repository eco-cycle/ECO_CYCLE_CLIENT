import React, { useRef, useState } from "react";
import "../styles/pages/InfoPage.scss";

import noProfile from "../assets/InfoPage/noProfile.png";
import imageEdit from "../assets/InfoPage/setting.svg";
import { updateProfile } from "../apis/Info/apis"; // 새로 추가한 API 파일을 가져옴
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const imgRef = useRef();
  const [nickname, setNickname] = useState("");

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setImageUrl(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onClickFileBtn = () => {
    imgRef.current.click();
  };

  const onSubmit = async () => {
    try {
      const response = await updateProfile(nickname, imageUrl);
      navigate('/')
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="Info--Wrapper">
      <div className="Info--Circle">2</div>
      <div className="Info--TextBox">
        <div>마지막입니다!</div>
        <div>
          <span style={{ color: "#47ABFF", fontWeight: "700" }}>
            닉네임, 프로필사진
          </span>
          을
        </div>
        <div>등록해주세요.</div>
      </div>
      <div className="Info--InputImage--Box">
        <img
          src={preview ? preview : noProfile}
          className="Info--InputImage"
          alt="profileImage"
        />
        <input
          type="file"
          ref={imgRef}
          onChange={onChangeImage}
          style={{ display: "none" }}
        />
        <img
          src={imageEdit}
          alt="imageEdit"
          className="Info--InputImage--Edit"
          onClick={() => onClickFileBtn()}
        />
      </div>
      <input
        type="text"
        className="Info--Input--Nickname"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <button
        disabled={!nickname}
        style={{ backgroundColor: !nickname ? "lightgray" : "" }}
        className="Input--Button"
        onClick={onSubmit}
      >
        완료
      </button>
    </div>
  );
};

export default InfoPage;
