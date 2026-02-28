import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  initModel,
} from "../utils/utils";

const FaceExpression = () => {
  const webcamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const requestRef = useRef(null);

  const [expression, setExpression] = useState("Initializing...");
  const [error, setError] = useState(null);

  useEffect(() => {
    initModel({ landmarkerRef, setExpression, requestRef, webcamRef, setError });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
    };
  }, []);

  if (error) {
    return <div style={{ color: "red", padding: 20 }}>Error: {error}</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: 640,
        height: 480,
        background: "#000",
      }}
    >
      <Webcam
        ref={webcamRef}
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0 }}
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
      />

      {/* Expression Display */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          padding: "8px 12px",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          borderRadius: 8,
          fontSize: 20,
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        Expression: {expression}
      </div>
    </div>
  );
};

export default FaceExpression;
