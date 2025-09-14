import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const CamTest = () => {
  const webcamRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);

  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    setCapturedImg(img);
  };

  const videoConst = {
    height: 300,
    width: 300,
    facingMode: "user",
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={videoConst}
        mirrored={true}
        screenshotFormat="image/jpeg"
        className="border-2 rounded-2xl"
      />
      <div>
        <button className="border-2 cursor-pointer rounded-md" onClick={capture}>Capture</button>
      </div>
      {capturedImg && (
        <div style={{ marginTop: "20px" }}>
          <h3>Captured Image:</h3>
          <img src={capturedImg} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CamTest;
