import React, { useEffect, useState } from 'react';
import "../styles/pages/CollectionDetailPage.scss";
import Apis from '../apis/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from "../assets/LoginPage/backIcon.svg";
import noProfile from '../assets/MyPage/noProfile.jpg';
import heart from '../assets/detail/heart.svg';
import pay from "../assets/detail/ecoPay.svg";

const CollectionDetailPage = () => {
    const [resource, setResource] = useState();
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        Apis.get(`/api/v1/recycle/item/${id}`)
        .then((response) => {
            setResource(response.data.data)
        })
    },[]);

    console.log(resource);

    return (
      <div className="detail--wrapper">
        <div className="detail--Header">
          <img
            src={backIcon}
            alt="back-btn"
            className="detail--BackIcon"
            onClick={() => navigate(-1)}
          />
        </div>
        {resource && (
          <>
            <div className="detail--UserInfo">
              <img
                src={resource.userImage ? resource.userImage : noProfile}
                alt="userImage"
                className="detail--UserInfo--Image"
              />
              <div className="detail--UserInfo--Text">
                <div style={{ fontSize: "20px" }}>{resource.nickname}</div>
                <div style={{ fontSize: "14px" }}>{resource.location}</div>
              </div>
            </div>
            <img
              src={resource.imageUrl}
              alt="recycle-Image"
              className="detail--Recycle--Image"
            />
            <div className="detail--Recycle--Info">
              {resource.type}&nbsp;1개
            </div>
            <div className="detail--Bottom">
              <img src={heart} alt="heart" className="detail--Bottom--heart" />
              <div className="vertical-bar"></div>
              <div className="detail--Bottom--Info">
                <div>{resource.price}원</div>
                <img src={pay} alt="eco" />
              </div>
              <div className="detail--Bottom--Pay">결제하고 채팅하기</div>
            </div>
          </>
        )}
      </div>
    );
};

export default CollectionDetailPage;