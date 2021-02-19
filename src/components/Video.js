import React, { useState } from "react";
import { useEffect, useRef } from "react";

const Video = (props) => {
  const video = useRef();
  const divv = useRef();
  const [videoElement, setVideoElement] = useState();
  let videoHTML;

  useEffect(() => {
    props.peer.user.on("stream", (stream) => {});
  }, []);

  function show() {
    divv.current.appendChild(videoHTML);
    videoHTML.play();
  }

  function removeChild() {
    divv.current.removeChild(videoHTML);
  }

  return (
    <>
      <button onClick={show}>SHOW</button>
      <button onClick={removeChild}>REMOVE</button>
      <div ref={divv} id={"#peerDiv"}>
        {videoElement}
      </div>
    </>
  );
};

export default Video;
