import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  initModel,
} from "../utils/utils";
import { useSong } from "../../home/hooks/useSong";

const FaceExpression = () => {
  const webcamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const requestRef = useRef(null);

  const [expression, setExpression] = useState("Initializing...");
  const [error, setError] = useState(null);
  const { handleGetSong } = useSong();

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

  const fetchSongBasedOnMood = () => {
    if (expression && !expression.includes("Initializing") && !expression.includes("Waiting") && !expression.includes("No face detected")) {
      // Extract main emotion from string (e.g., "😊 Happy" -> "Happy")
      const moodParts = expression.split(" ");
      const coreMood = moodParts.length > 1 ? moodParts[moodParts.length - 1] : expression;
      
      console.log(`Manual fetch triggered for mood: ${coreMood}. Fetching song...`);
      handleGetSong({ mood: coreMood });
    } else {
      alert("Please wait for a valid face expression before fetching a song.");
    }
  };

  if (error) {
    return <div style={{ color: "red", padding: 20 }}>Error: {error}</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        aspectRatio: "4/3",
        background: "#000",
        borderRadius: "16px",
        overflow: "hidden"
      }}
    >
      <Webcam
        ref={webcamRef}
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <div>Expression: {expression}</div>
        <button 
          onClick={fetchSongBasedOnMood}
          style={{
            background: "#1DB954",
            color: "black",
            border: "none",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            alignSelf: "flex-start"
          }}
        >
          Fetch Song
        </button>
      </div>
    </div>
  );
};

export default FaceExpression;
