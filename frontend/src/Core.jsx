import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const Core = () => {
  const webcamRef = useRef(null);
  const [captImage, setCaptImg] = useState(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setCaptImg(image);
  };

  const Constraints = {
    height: 300,
    width: 300,
  };

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          videoConstraints={Constraints}
          screenshotFormat="image/jpeg"
          className="border-1 rounded-2xl shadow-3xl shadow-black"
        />
        <Button onClick={capture} className="w-full mt-3 py-6 text-2xl">
          Capture
        </Button>
      </div>
      <div>
        {captImage && (
          <div>
            <h1>Captured Image:</h1>
            <img src={captImage} alt="captured" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Core;
