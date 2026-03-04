import Webcam from "react-webcam";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const loop = ({ landmarkerRef, webcamRef, setExpression, requestRef, expressionRef }) => {
  detectBlendshapes({ landmarkerRef, webcamRef, setExpression, currentExpression: expressionRef.current });
  requestRef.current = requestAnimationFrame(() =>
    loop({ landmarkerRef, webcamRef, setExpression, requestRef, expressionRef })
  );
};

export const mapToEmotion = (blend) => {
  const s = {};
  blend.forEach((b) => (s[b.categoryName] = b.score));

  if (s.mouthSmileLeft > 0.3 || s.mouthSmileRight > 0.3) return "happy";
  if (s.browDownLeft > 0.25 || s.browDownRight > 0.25) return "angry";
  if (s.jawOpen > 0.3 || s.eyeWideLeft > 0.3 || s.eyeWideRight > 0.3) return "surprised";
  if (s.mouthFrownLeft > 0.25 || s.mouthFrownRight > 0.25) return "sad";

  return "neutral";
};

export const detectBlendshapes = ({
  landmarkerRef,
  webcamRef,
  setExpression,
  currentExpression,
}) => {
  if (!landmarkerRef.current || !webcamRef.current) return;

  const video = webcamRef.current.video;
  if (!video || video.readyState !== 4 || video.videoWidth === 0 || video.videoHeight === 0) return;

  try {
    const result = landmarkerRef.current.detectForVideo(
      video,
      performance.now(),
    );

    if (result.faceBlendshapes?.length > 0) {
      const blend = result.faceBlendshapes[0].categories;
      const emotion = mapToEmotion(blend);
      if (emotion !== currentExpression) {
        setExpression(emotion);
      }
    } else if (currentExpression !== "No face detected") {
      setExpression("No face detected");
    }
  } catch (err) {
    console.error("Detection error:", err);
  }
};

export const initModel = async ({
  landmarkerRef,
  setExpression,
  requestRef,
  webcamRef,
  setError,
  expressionRef,
  isMounted,
  isInitializingRef
}) => {
  if (isInitializingRef.current || landmarkerRef.current) return;
  isInitializingRef.current = true;

  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm",
    );

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    if (!isMounted.current) {
      landmarker.close();
      return;
    }

    landmarkerRef.current = landmarker;
    setExpression("Waiting for webcam...");
    
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() =>
      loop({ landmarkerRef, webcamRef, setExpression, requestRef, expressionRef })
    );
  } catch (err) {
    console.error("Failed to initialize FaceLandmarker:", err);
    setError("Failed to load model. Please check your internet connection.");
  } finally {
    isInitializingRef.current = false;
  }
};
 