import React, { useEffect, useState } from "react";
import "../styles/pages/CreatePage.scss";

import Graph from "../pages/Graph/Graph";
import Camera from "../components/CollectionPage/Camera";
import { GraphData } from "../pages/Graph/GraphData";

import Reset from '../assets/CreatePage/Reset.svg';
import Delete from "../assets/CreatePage/Delete.svg";
import { useNavigate } from "react-router-dom";
import { createRecycle } from "../apis/collection/apis";

const CreatePage = () => {
  const navigate = useNavigate();

  const [capture, setCapture] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const [isGraph, setIsGraph] = useState(true);
  const [response, setIsResponse] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (GraphData[response]) {
      const averageValue = GraphData[response][6].average;
      setPrice(Math.trunc(averageValue));
    } else {
    console.log("Invalid response key");
    }
  }, [response])

  const handleSubmit = async () => {
    // FormData에 값이 올바르게 들어가는지 확인
    if (!capture || !response) {
      console.error("Capture or response is not set");
      return;
    }

    console.log("Submitting with capture:", capture);
    console.log("Submitting with response:", response);
    console.log("Submitting with price:", price);

    try {
      const res = await createRecycle(capture, response, price);
      console.log("Response from server:", res);
      navigate("/collection");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      {isCamera && (
        <Camera
          setIsCamera={setIsCamera}
          setIsResponse={setIsResponse}
          setCapture={setCapture}
        />
      )}
      {isGraph && <Graph setIsGraph={setIsGraph} setIsCamera={setIsCamera} />}
      {!isGraph && !isCamera && (
        <div className="Create--Wrapper">
          <div className="Create--Header">자원 정보 입력</div>
          <div className="Create--Main">
            <img
              src={URL.createObjectURL(capture)}
              alt="Captured Resource"
              className="Create--Main--Image"
            />
          </div>
          <input
            type="text"
            value={response}
            onChange={(e) => setIsResponse(e.target.value)}
            className="Create--Main--Type"
          />
          <div className="Create--Bottom">
            <div
              className="Create--Delete"
              onClick={() => navigate("/collection")}
            >
              <img src={Delete} alt="delete" />
              <div>삭제</div>
            </div>
            <div className="Create--Register" onClick={() => handleSubmit()}>
              등록
            </div>
            <div
              className="Create-Reset"
              onClick={() => window.location.reload()}
            >
              <img src={Reset} alt="Reset" />
              <div>초기화</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePage;
