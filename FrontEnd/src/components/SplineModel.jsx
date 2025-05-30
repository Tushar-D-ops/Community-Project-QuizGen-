import React from "react";
import Spline from "@splinetool/react-spline";

const SplineModel = () => {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <Spline scene="https://prod.spline.design/zYDgG6Kax6B1qVz2/scene.splinecode" 
style={{ 
  transform: "scale(1.2)", // Zoom in on the model
  marginTop:"-75px" ,// Move it up to hide watermark
  marginRight: "-270px" // Adjust left/right positioning
}}      />
    </div>
  );
};

export default SplineModel;
