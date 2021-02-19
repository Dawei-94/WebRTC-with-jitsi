import React, { useEffect, useState } from "react";

import "../styles/device-options.css";
import axios from "axios";

const DeviceOptions = (props) => {
  useEffect(() => {
    const videoElement = document.querySelector("video");
    const audioInputSelect = document.querySelector("select#audioSource");

    const videoSelect = document.querySelector("select#videoSource");
    const selectors = [audioInputSelect, videoSelect];

    function gotDevices(deviceInfos) {
      // Handles being called several times to update labels. Preserve values.
      const values = selectors.map((select) => select.value);
      selectors.forEach((select) => {
        while (select.firstChild) {
          select.removeChild(select.firstChild);
        }
      });
      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement("option");
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
          option.text =
            deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
          audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
          option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
          videoSelect.appendChild(option);
        } else {
        }
      }
      selectors.forEach((select, selectorIndex) => {
        if (
          Array.prototype.slice
            .call(select.childNodes)
            .some((n) => n.value === values[selectorIndex])
        ) {
          select.value = values[selectorIndex];
        }
      });
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then(gotDevices)
      .catch(handleError);

    function gotStream(stream) {
      window.stream = stream; // make stream available to console
      videoElement.srcObject = stream;
      // Refresh button list in case labels have become available
      return navigator.mediaDevices.enumerateDevices();
    }

    function handleError(error) {
      console.log(
        "navigator.MediaDevices.getUserMedia error: ",
        error.message,
        error.name
      );
    }

    function start() {
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      const audioSource = audioInputSelect.value;
      const videoSource = videoSelect.value;
      const constraints = {
        height: window.innerHeight / 2,
        width: (window.innerWidth * 3) / 5.8,
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .then(gotDevices)
        .catch(handleError);
    }

    audioInputSelect.onchange = start;

    videoSelect.onchange = start;

    start();
  }, []);

  const roomID = props.match.params.roomID;
  const name = props.match.params.name;
  const role = "presenter";
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState();

  function handleSubmit() {
    axios
      .get(`${baseUrl}/check`, {
        params: {
          roomID,
          role,
          name,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.history.push(`/presenter/${name}/${roomID}/`);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  return (
    <div className="device-options-page">
      <div id="device-options-container">
        <div className="select">
          <label htmlFor="audioSource">Audio input source: </label>
          <select id="audioSource"></select>
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select id="videoSource"></select>
        </div>

        <video id="video" playsInline autoPlay></video>

        <button className="submit-device-options" onClick={handleSubmit}>
          Submit
        </button>
        {error && <div className="error-signin">{error}</div>}
      </div>
    </div>
  );
};

export default DeviceOptions;
