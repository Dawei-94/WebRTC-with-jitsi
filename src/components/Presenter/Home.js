import React, { useEffect, useRef, useState, useContext } from "react";
import SocialIcons from "./SocialIcons";
import SocialInfo from "./SocialInfo";
import Rooms from "./Rooms";
import Stream from "./Stream";
import Effects from "./Effects";
import UserPhotos from "./UserPhotos";
import LiveParticipantsStream from "./LiveParticipantsStream";
import BRolls from "./BRolls";
import Message from "./Message";
import io from "socket.io-client";
import Peer from "simple-peer";
import { VideoContext } from "../../context/VideoProvider";

import "../../styles/presenter.css";
import axios from "axios";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: (window.innerWidth * 3) / 5.8,
};

const socket = io(process.env.REACT_APP_BASE_URL, {
  withCredentials: false,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

const Presenter = (props) => {
  const context = useContext(VideoContext);

  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  const messageInputRef = useRef();

  const liveParticipantVideos = useRef();
  const userPhotos = useRef();
  const videosRef = useRef([]);

  const userVideo = useRef();

  const roomID = props.match.params.roomID;
  const name = props.match.params.name;
  const role = "presenter";

  const [messages, setMessages] = useState([]);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        stream = window.stream || stream;
        userVideo.current.srcObject = stream;
        userVideo.current.defaultMuted = true;

        axios
          .get(`${process.env.REACT_APP_BASE_URL}/check`, {
            params: {
              roomID,
              role,
              name,
            },
          })
          .then((res) => {
            socket.emit("join room as presenter", { roomID, name });
            socket.emit("take all messages", { roomID });
          })
          .catch((error) => {
            props.history.push(`/`);
          });

        socket.on("all messages", ({ messages }) => {
          setMessages(messages);
        });

        socket.on("all users", (users) => {
          users.forEach((user) => {
            const peer = createPeer(user.socketId, socket.id, stream, role);

            peersRef.current.push({
              user: peer,
              socketId: user.socketId,
              role: user.role,
            });

            peer.on("stream", (stream) => {
              videosRef.current.push({
                user: peer,
                socketId: user.socketId,
                role: user.role,
                video: stream,
              });
            });
          });
        });

        socket.on("user joined", (payload) => {
          const item = peersRef.current.find(
            (p) => p.socketId === payload.callerID
          );
          if (!item) {
            const peer = addPeer(payload.signal, payload.callerID, stream);

            peersRef.current.push({
              user: peer,
              socketId: payload.callerID,
              role: payload.role,
            });

            peer.on("stream", (stream) => {
              videosRef.current.push({
                user: peer,
                socketId: payload.callerID,
                role: payload.role,
                video: stream,
              });
            });
          }
        });

        socket.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.socketId === payload.id);
          item.user.signal(payload.signal);
        });

        socket.on("disconnect", (payload) => {
          const disconnectedUser = peersRef.current.find(
            (user) => user.socketId === payload.socketId
          );
          disconnectedUser.user.destroy();

          peersRef.current = peersRef.current.filter(
            (user) => user.socketId !== payload.socketId
          );
          videosRef.current = videosRef.current.filter(
            (user) => user.socketId !== payload.socketId
          );

          const removedVideo = document.getElementById(
            `video-${payload.socketId}`
          );
          const removedImage = document.getElementById(
            `img-${payload.socketId}`
          );

          if (removedImage || removedVideo) {
            removedVideo.remove();
            removedImage.remove();
          }
        });

        socket.on("watch this user", ({ socketId }) => {
          const user = videosRef.current.find(
            (user) => user.socketId === socketId
          );

          if (liveParticipantVideos.current) {
            const userContainer = document.createElement("div");
            userContainer.className = "item watchme-user";
            userContainer.id = `video-${user.socketId}`;

            const fullButton = document.createElement("button");
            fullButton.className =
              "btn btn-sm btn-custom font-weight-normal mt-1 pt-0 pb-0";
            fullButton.innerHTML = "FULL";
            fullButton.onclick = () => {
              fullButton.disabled = true;
              fullVideo(user.socketId);
              setTimeout(function () {
                fullButton.disabled = false;
              }, 5000);
            };

            const splitButton = document.createElement("button");
            splitButton.className =
              "btn btn-sm btn-custom font-weight-normal mt-1 pt-0 pb-0";
            splitButton.innerHTML = "SPLIT";
            splitButton.onclick = () => {
              splitButton.disabled = true;
              splitVideo(user.socketId);
              setTimeout(function () {
                splitButton.disabled = false;
              }, 5000);
            };

            userContainer.appendChild(renderVideoElement(user.video));
            userContainer.appendChild(fullButton);
            userContainer.appendChild(splitButton);

            liveParticipantVideos.current.appendChild(userContainer);
          }
        });

        socket.on("picture this user", ({ socketId, picture }) => {
          const user = videosRef.current.find(
            (user) => user.socketId === socketId
          );

          if (liveParticipantVideos.current) {
            const userContainer = document.createElement("div");
            userContainer.className = "item watchme-user";
            userContainer.id = `img-${user.socketId}`;

            const fullButton = document.createElement("button");
            fullButton.className =
              "btn btn-sm btn-custom font-weight-normal mt-1 pt-0 pb-0";
            fullButton.innerHTML = "FULL";
            fullButton.onclick = () => {
              fullButton.disabled = true;
              fullImage(user.socketId, picture);
              setTimeout(function () {
                fullButton.disabled = false;
              }, 5000);
            };

            const splitButton = document.createElement("button");
            splitButton.className =
              "btn btn-sm btn-custom font-weight-normal mt-1 pt-0 pb-0";
            splitButton.innerHTML = "SPLIT";
            splitButton.onclick = () => {
              splitButton.disabled = true;
              splitImage(user.socketId, picture);
              setTimeout(function () {
                splitButton.disabled = false;
              }, 5000);
            };

            const img = document.createElement("img");
            img.src = picture;
            img.className = "img-fluid participant-image";

            userContainer.appendChild(img);
            userContainer.appendChild(fullButton);
            userContainer.appendChild(splitButton);

            userPhotos.current.appendChild(userContainer);
          }
        });

        socket.on("receive messages", ({ body, name }) => {
          setMessages((prevState) => [...prevState, { body, name }]);
        });
      });
  }, []);

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function createPeer(userToSignal, callerID, stream, role) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        role,
      });
    });

    return peer;
  }

  function renderVideoElement(stream) {
    let videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.class = "embed-responsive-item";
    videoElement.autoplay = true;
    return videoElement;
  }

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.partyingwith.us/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);
    return loadJitsiScriptPromise;
  };
  async function startBroadCast() {
    document.getElementById("start-broadcast").remove();
    document.getElementById("video-container").remove();
    socket.emit("start broadcast", { socketId: socket.id });
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }
    let detailsArr = window.location.pathname.split("/");
    const domain = "meet.partyingwith.us";
    const api = new window.JitsiMeetExternalAPI(domain, {
        roomName: detailsArr[3],
        height: 700,
        noSsl: false,
        parentNode: document.getElementById('jitsi-container-show'),
        userInfo: {
            displayName: detailsArr[2]
        }
    });
    api.executeCommand('displayName', detailsArr[2]);
    api.addEventListener('videoConferenceJoined', function(newData){
        console.log("videoConferenceJoined=======", newData);
    });

    api.addEventListener('videoConferenceLeft', function(newData){
    });
  }

  function updateSocialInfos(name, value) {
    socket.emit("update social infos", { name, value });
  }

  function sendMessage(name, body) {
    socket.emit("send message", { socketId: socket.id, name, body });
    setMessages((prevState) => [...prevState, { body, name }]);
  }

  function changeBackgroundImage(url) {
    document.body.style.backgroundImage = `url("${url}")`;
    document.body.style.backgroundSize = `cover`;
    document.body.style.backgroundRepeat = `repeat`;
    socket.emit("change background", {
      url,
    });
  }

  function addEffect(name) {
    socket.emit("add effect", {
      name,
    });
  }

  function fullVideo(socketId) {
    socket.emit("full user video", { socketId: socketId });
  }

  function splitVideo(socketId) {
    socket.emit("split user video", { socketId: socketId });
  }

  function fullImage(socketId, picture) {
    socket.emit("full user image", { socketId: socketId, picture });
  }

  function splitImage(socketId, picture) {
    socket.emit("split user image", { socketId: socketId, picture });
  }

  function broll() {
    setToggle(true);
    socket.emit("broll", { socketId: socket.id });
    setTimeout(function () {
      setToggle(false);
    }, 5000);
  }

  return (
    <>
      <div role="main">
        <div className="container">
          <div className="row shadow-lg bg-gradient pb-3">
            <div className="col-lg-8 pl-0">
              <div className="row" id="accordion">
                <div className="col-lg-12">
                  <div id={"jitsi-container-show"}>
                  </div>
                  <video
                    ref={userVideo}
                    autoPlay
                    playsInline
                    muted={"muted"}
                    width="100%"
                    id={"video-container"}
                  >
                    Sorry, your browser doesn't support embedded videos, but
                    don't worry, you can
                    <a href="https://archive.org/details/BigBuckBunny_124">
                      download it
                    </a>
                    and watch it with your favorite video player!
                  </video>
                  <div class="top-buttons">
                      <div class="row">
                          <div class="col-lg-6">
                              <div class="btn-group" role="group" aria-label="">
                                  <button type="button" class="btn btn-secondary">Earned</button>
                                  <button type="button" class="btn btn-success">$123</button>
                              </div>
                          </div>
                          <div class="col-lg-6">
                          </div>
                      </div>
                  </div>
                  <button
                    type="button"
                    className="btn-dj"
                    onClick={startBroadCast}
                    id={"start-broadcast"}
                  >
                    START BROADCAST
                  </button>

                  <SocialIcons />
                </div>
                <SocialInfo updateSocialInfos={updateSocialInfos} />
                <Rooms changeBackgroundImage={changeBackgroundImage} />
                <Stream />
                <Effects addEffect={addEffect} />
                <UserPhotos userPhotos={userPhotos} />
                <LiveParticipantsStream
                  liveParticipantVideos={liveParticipantVideos}
                />
                <BRolls brollToggle={toggle} broll={broll} />
              </div>
            </div>
            <div className="col-lg-4 bg-right">
              <div className="right-bar">
                {messages.map((message) => (
                  <Message message={message.body} name={message.name} />
                ))}
              </div>
              <div className="row bg-right-bottom p-3">
                <div className="col-lg-9 col-sm-9 pr-0">
                  <input
                    type="text"
                    placeholder="Send Message"
                    className="form-control form-control-sm input-img"
                    ref={messageInputRef}
                  />
                </div>
                <div className="col-lg-3 col-sm-3">
                  <button
                    type="button"
                    className="btn  btn-sm btn-block btn-custom"
                    onClick={() =>
                      sendMessage(name, messageInputRef.current.value)
                    }
                  >
                    CHAT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="container text-center">
        <p className="text-white">TERM OF USE - PRIVACY POLICY</p>
        <p className="text-white">Copyright @2020 Rick Tuinenburg</p>
      </footer>
    </>
  );
};

export default Presenter;
