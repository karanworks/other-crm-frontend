import React from "react";
import { AudioVisualizer } from "react-audio-visualize";

const RecordingVisualizer = ({ audioBlob, currentTime }) => {
  return (
    <div>
      {audioBlob && (
        <AudioVisualizer
          blob={audioBlob}
          width={400}
          height={75}
          barWidth={2}
          gap={1.5}
          barColor={"rgba(37, 160, 226, 0.2)"}
          barPlayedColor={"rgba(37, 160, 226, 1)"}
          currentTime={currentTime}
        />
      )}
    </div>
  );
};

export default RecordingVisualizer;
