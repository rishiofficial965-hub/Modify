import Webcam from "react-webcam";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const loop = ({ landmarkerRef, webcamRef, setExpression, requestRef }) => {
  detectBlendshapes({ landmarkerRef, webcamRef, setExpression });
  requestRef.current = requestAnimationFrame(() =>
    loop({ landmarkerRef, webcamRef, setExpression, requestRef })
  );
};

// 🔥 Improved Emotion Mapping
export const mapToEmotion = (blend) => {
  const s = {};
  blend.forEach((b) => (s[b.categoryName] = b.score));

  if (s.mouthSmileLeft > 0.25 || s.mouthSmileRight > 0.25) return "😊 Happy";

  if (s.browDownLeft > 0.2 || s.browDownRight > 0.2) return "😡 Angry";

  if (s.jawOpen > 0.35 || s.eyeWideLeft > 0.35 || s.eyeWideRight > 0.35)
    return "😮 Surprised";

  if (s.mouthFrownLeft > 0.2 || s.mouthFrownRight > 0.2) return "😢 Sad";

  return "😐 Neutral";
};

export const detectBlendshapes = ({
  landmarkerRef,
  webcamRef,
  setExpression,
}) => {
  if (!landmarkerRef.current || !webcamRef.current) return;

  const video = webcamRef.current.video;
  if (!video || video.readyState !== 4) return;

  try {
    const result = landmarkerRef.current.detectForVideo(
      video,
      performance.now(),
    );

    if (result.faceBlendshapes?.length > 0) {
      const blend = result.faceBlendshapes[0].categories;
      const emotion = mapToEmotion(blend);
      setExpression(emotion);
    } else {
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
}) => {
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

    landmarkerRef.current = landmarker;
    setExpression("Waiting for webcam...");
    requestRef.current = requestAnimationFrame(() =>
      loop({ landmarkerRef, webcamRef, setExpression, requestRef })
    );
  } catch (err) {
    console.error("Failed to initialize FaceLandmarker:", err);
    setError("Failed to load model. Please check your internet connection.");
  }
};
 