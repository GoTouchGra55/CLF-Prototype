import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const Core = () => {
  const webcamRef = useRef(null);
  const [captImage, setCaptImg] = useState(null);
  const [prediction, setPrediction] = useState("");

  const capture = async () => {
    const image = webcamRef.current.getScreenshot();
    setCaptImg(image);

    if (!image) return;

    try {
      const blob = await (await fetch(image)).blob();
      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      const response = await fetch("http://127.0.0.1:8000/predict-image", {
        method: "POST",
        body: formData
      })

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      throw new Error("Failed to upload image", err);
    }
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
        <Button onClick={capture} className="w-full mt-3 py-6 text-2xl cursor-pointer">
          Predict
        </Button>
      </div>
      <div>
        {(captImage && prediction) && (
          <div className="mb-5 sm:mb-0">
            <img
              src={captImage}
              alt="captured"
              className="border-1 rounded-2xl"
            />
            <h1 className="text-2xl w-full mt-3 py-2 bg-green-600 rounded-[7px] text-center">
              Predicted: {prediction.class_name}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Core;
