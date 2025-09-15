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
    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-30 mt-2">
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          videoConstraints={Constraints}
          screenshotFormat="image/jpeg"
          className="border-1 rounded-2xl"
        />
        <Button onClick={capture} className="w-full mt-3 py-6 text-2xl">
          Predict
        </Button>
      </div>
      <div>
        {captImage && (
          <div className="mb-5 sm:mb-0">
            <img
              src={captImage}
              alt="captured"
              className="border-1 rounded-2xl"
            />
            <h1 className="text-2xl w-full mt-3 py-2 bg-green-600 rounded-[7px] text-center">
              Predicted: Human(89%)
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Core;
