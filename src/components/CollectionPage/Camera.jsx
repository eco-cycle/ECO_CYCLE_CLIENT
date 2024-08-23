import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "../../styles/components/CollectionPage/Camera.scss";
import Shot from "../../assets/Camera/Shot.svg";
import Close from "../../assets/Camera/Close.svg";
import { useNavigate } from "react-router-dom";
import { getImageProcessingFunc } from "../../apis/collection/apis";

const Camera = (props) => {
  const { setIsCamera, setIsResponse, setCapture } = props;

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      const file = new File([blob], "image.jpeg", { type: "image/jpeg" });

      setCapture(file);

      try {
        const response = await getImageProcessingFunc(file);
        console.log(response);
        setIsResponse(response.data.predictedClass);
        setIsCamera(false)
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  return (
    <div className="Camera--Wrapper">
      <div className="Camera--TopBar">
        <img
          src={Close}
          alt="Close"
          className="Camera--Close--Btn"
          onClick={() => navigate("/collection")}
        />
      </div>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
          focusMode: "continuous",
        }}
        ref={webcamRef}
        className="Camera_Layout"
      />
      <div className="Camera--BottomBar">
        <img
          src={Shot}
          alt="shot"
          className="Camera--Shot--Btn"
          onClick={capturePhoto}
        />
      </div>
    </div>
  );
};

export default Camera;
