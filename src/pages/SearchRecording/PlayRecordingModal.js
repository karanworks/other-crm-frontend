import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody, Modal, ModalBody, ModalHeader } from "reactstrap";
import RecordingVisualizer from "./RecordingVisualizer";
import audioFile from "./audio.wav";

const PlayRecordingModal = ({
  modal_backdrop,
  setmodal_backdrop,
  tog_backdrop,
}) => {
  const audioElement = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.addEventListener("play", handlePlay);
    }

    async function handleAudioBlob() {
      try {
        const response = await fetch(audioFile);
        const blob = await response.blob();
        setAudioBlob(blob);
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    }
    handleAudioBlob();

    return () => {
      if (audioElement.current) {
        audioElement.current.removeEventListener("play", handlePlay);
      }
    };
  }, [audioFile]);

  const handlePlay = () => {};

  const handleTimeUpdate = () => {
    setCurrentTime(audioElement.current.currentTime);
  };

  return (
    <Modal
      isOpen={modal_backdrop}
      toggle={() => {
        tog_backdrop();
      }}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      <ModalHeader
        toggle={() => {
          setmodal_backdrop(false);
        }}
      >
        Listen Recording
      </ModalHeader>
      <ModalBody className="text-center p-5">
        <div className="mt-4">
          <h3 className="mb-3">Call Recording</h3>
          <RecordingVisualizer
            audioBlob={audioBlob}
            currentTime={currentTime}
          />
          <audio
            ref={audioElement}
            src={audioFile}
            controls
            onPlay={handlePlay}
            onTimeUpdate={handleTimeUpdate}
            className="recording-audio-element"
          ></audio>
          <span className="audio-text"></span>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PlayRecordingModal;
