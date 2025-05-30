import React from "react";
import Spline from "@splinetool/react-spline";

const SplineBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[-1]">
      <Spline scene="https://prod.spline.design/worW4hTQslHBsNRM/scene.splinecode" 
      style={{ transform: "scale(1.2)",marginRight: "-270px"}}/>
    </div>
  );
};

export default SplineBackground;
