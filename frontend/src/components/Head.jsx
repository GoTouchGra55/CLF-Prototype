import React from "react";

const Head = () => {
  return (
    <div className="flex-grow">
      <header
        className="text-6xl sm:text-4xl md:text-5xl lg:text-6xl
 font-mono text-[#EEF4D4] flex flex-col items-center justify-center
 mt-10 mb-4 font-extrabold"
      >
        Classify Me!
      </header>
      <p
        className="text-base sm:text-lg md:text-xl lg:text-2xl
 flex flex-col items-center justify-center
 font-mono text-amber-100 items-baseline-center lg:ring-0 ring-1"
      >
        Capture an image and let AI classify it
      </p>
    </div>
  );
};

export default Head;
