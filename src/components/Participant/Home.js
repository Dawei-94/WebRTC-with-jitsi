import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { VideoContext } from "../../context/VideoProvider";
import Reactions from "./Reactions";
import ReactLoading from "react-loading";
import Message from "./Message";

import "../../styles/participant.css";
import SocialIcons from "./SocialIcons";

import vaw from "./sound-effect.wav";
import video from "./video.mp4";
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

const Participant = (props) => {
  const context = useContext(VideoContext);

  const peersRef = useRef([]);

  const [effect, setEffect] = useState();

  const messageInputRef = useRef();

  const presenterContainerRef = useRef();
  const fullContainer = useRef();
  const participantsContainerRef = useRef();
  const videosRef = useRef([]);

  const userVideo = useRef();

  const roomID = props.match.params.roomID;
  const name = props.match.params.name;
  const role = "participant";

  const [messages, setMessages] = useState([]);

  const [toggle, setToggle] = useState(false);

  const [socialMedia, setSocialMedia] = useState({
    paypal: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
    snapchat: "",
  });

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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userVideo.current.defaultMuted = true;

        window.stream = stream;

        axios
          .get(`${process.env.REACT_APP_BASE_URL}/check`, {
            params: {
              roomID,
              role,
              name,
            },
          })
          .then((res) => {
            socket.emit("join room as participant", { roomID, name });
            socket.emit("take all messages", { roomID });
            setTimeout(function () {
              socket.emit("is broadcast started", { socketId: socket.id });
            }, 3000);
          })
          .catch((error) => {
            props.history.push(`/`);
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
      });

    socket.on("all messages", ({ messages }) => {
      setMessages(messages);
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
    });

    socket.on("start presenter video", async ({ socketId }) => {
      const user = videosRef.current.find((user) => user.socketId === socketId);
      if (presenterContainerRef.current) {
        const myNode = document.getElementById("live-session-display");
        myNode.innerHTML = '';

        if (!window.JitsiMeetExternalAPI) {
          await loadJitsiScript();
        }
        let detailsArr = window.location.pathname.split("/");
        const domain = "meet.partyingwith.us";
        const api = new window.JitsiMeetExternalAPI(domain, {
            roomName: detailsArr[3],
            height: 700,
            noSsl: false,
            parentNode: document.getElementById('live-session-display'),
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
    });

    socket.on("take updated social infos", ({ name, value }) => {
      setSocialMedia((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    });

    socket.on("receive messages", ({ body, name }) => {
      setMessages((prevState) => [...prevState, { body, name }]);
    });

    socket.on("change participant background", ({ url }) => {
      document.getElementsByClassName(
        "bg-body"
      )[0].style.backgroundImage = `url("${url}")`;
      document.getElementsByClassName("bg-body")[0].backgroundSize = `cover`;
      document.getElementsByClassName("bg-body")[0].backgroundRepeat = `repeat`;
    });

    socket.on("apply effect", ({ name }) => {
      setEffect(name);
    });

    socket.on("add user video to split section", ({ socketId }) => {
      let user = videosRef.current.find((user) => user.socketId === socketId);
      if (!user && socketId === socket.id) {
        user = {
          video: window.stream,
          socketId: socket.id,
        };
      }

      const div = document.createElement("div");
      div.appendChild(renderVideoElement(user.video));
      participantsContainerRef.current.appendChild(div);

      setTimeout(function () {
        div.remove();
      }, 5000);
    });

    socket.on("make full user video", ({ socketId }) => {
      let user = videosRef.current.find((user) => user.socketId === socketId);
      if (!user && socketId === socket.id) {
        user = {
          video: window.stream,
          socketId: socket.id,
        };
      }

      const div = document.createElement("div");
      div.appendChild(renderVideoElement(user.video));
      fullContainer.current.appendChild(div);

      setTimeout(function () {
        div.remove();
      }, 5000);
    });

    socket.on("play broll", () => {
      const div = document.createElement("div");

      const videoElement = document.createElement("video");
      videoElement.src = video;
      videoElement.autoplay = true;
      div.appendChild(videoElement);
      fullContainer.current.appendChild(div);

      setTimeout(function () {
        div.remove();
      }, 5000);
    });

    socket.on("add user image to split section", ({ socketId, picture }) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = picture;
      img.className = "user-split-image";
      div.appendChild(img);

      participantsContainerRef.current.appendChild(div);

      setTimeout(function () {
        div.remove();
      }, 5000);
    });

    socket.on("make full user image", ({ socketId, picture }) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = picture;
      img.className = "user-full-image";
      div.appendChild(img);

      fullContainer.current.appendChild(div);
      setTimeout(function () {
        div.remove();
      }, 5000);
    });

    socket.on("play sound effect", () => {
      const effect = new Audio(vaw);
      effect.play();
    });
  }, []);

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
        role: role,
      });
    });

    return peer;
  }

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

  function renderVideoElement(stream) {
    let videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.className = "embed-responsive-item";
    videoElement.autoplay = true;

    return videoElement;
  }

  function watchme() {
    socket.emit("watchme", { socketId: socket.id });
    document.getElementsByClassName('participant-img')[0].style.display = 'none';
    document.getElementsByClassName('participant-video')[0].style.display = 'block';
  }

  function sendMessage(name, body) {
    socket.emit("send message", { socketId: socket.id, name, body });
    setMessages((prevState) => [...prevState, { body, name }]);
  }

  function openModel() {
    document.getElementsByClassName('modal')[0].style.display = 'block';
  }
  
  function closeModel () {
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }

  function takePicture() {
    const video = document.getElementById("participant-video");
    const canvas = document.getElementById("participant-canvas");
    const photo = document.getElementById("photo");

    const height = video.videoHeight;
    const width = video.videoWidth;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL("image/png");

    socket.emit("picture", { socketId: socket.id, picture: data });
  }

  function playSoundEffect() {
    setToggle(true);
    socket.emit("sound effect", { socketId: socket.id });
    setTimeout(function () {
      setToggle(false);
    }, 5000);
  }

  return (
    <div className="bg-body">
      <div role="main">
        <div className="container">
          <div className="row shadow-lg bg-gradient pb-3">
            <div className="col-lg-8 pl-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dj-box">
                    <div
                      className={
                        effect ? `presenter-video ${effect}` : "presenter-video"
                      }
                      id={"live-session-display"}
                      ref={presenterContainerRef}
                    >
                      <ReactLoading
                        type={"spin"}
                        color={"#FFF"}
                        height={50}
                        width={50}
                      />
                      <div
                        className="participant-full"
                        ref={fullContainer}
                      ></div>
                      <div
                        className="participants-split-videos"
                        ref={participantsContainerRef}
                      ></div>
                    </div>
                    <div className="dj-video"></div>
                    <div className="dj-img"></div>
                    <SocialIcons socialMedia={socialMedia} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card rounded-0 border-0">
                    <div className="card-body bg-section">
                      <Reactions
                        playSoundEffect={playSoundEffect}
                        toggle={toggle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <img src="/assets/img/watch-me.jpg" className="img-fluid participant-img" />
                  <video
                    className={"participant-video"}
                    muted={"muted"}
                    ref={userVideo}
                    style={{display: 'none', height: '200px'}}
                    autoPlay
                    playsInline
                    id={"participant-video"}
                  />
                  <canvas
                    id="participant-canvas"
                    style={{ display: "none" }}
                  ></canvas>
                  <div className="bg-watch p-3">
                    <button
                      type="button"
                      className="btn btn-lg btn-custom font-16 pt-1 pb-1 pl-5 pr-5"
                      onClick={watchme}
                    >
                      WATCH ME
                    </button>
                    <img
                      src="/assets/img/camera.png"
                      className="img-fluid"
                      width="55"
                      id={"start-button"}
                      onClick={takePicture}
                    />
                  </div>
                  <div class="bg-right pt-lg-4 pl-2 h-dj">
                      <div class="row align-items-center">
                          <div class="col-lg-4 col-sm-4 pr-lg-0">
                              <img src="/assets/img/dj.png" class="img-fluid" />
                          </div>
                          <div class="col-lg-5 col-sm-5 p-lg-0 my-3">
                              <button type="button" class="btn btn-gradient font-16 pt-1 pb-1" data-toggle="modal" data-target="#BuyDjDrink">BUY DJ A DRINK</button>
                          </div>
                          <div class="col-lg-2 col-sm-2 pr-lg-0">
                              <img src="/assets/img/drink.png" class="img-fluid" />
                          </div>
                      </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-6">
                    <img src="/assets/img/shape-your-body.jpg" class="img-fluid" />
                </div>
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
            <div class="modal" id="BuyDjDrink" tabindex="-1" role="dialog" aria-labelledby="BuyDjDrink" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                            <div class="row align-items-center">
                                <div class="col-md-6 col-6">
                                    <img src="/assets/img/select-drink.png" class="img-fluid" />
                                </div>
                                <div class="col-md-6 col-6 pr-0">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="beer" />
                                        <label class="custom-control-label text-white font-weight-normal" for="beer">$ 2.00
                                        </label>
                                        <img src="/assets/img/beer.png" class="img-fluid" width="40" />
                                    </div>
                                    <div class="custom-control custom-checkbox my-2">
                                        <input type="checkbox" class="custom-control-input" id="wine" />
                                        <label class="custom-control-label text-white font-weight-normal" for="wine">$ 4.00
                                        </label>
                                        <img src="/assets/img/wine.png" class="img-fluid" width="40" />
                                    </div>
                                    <div class="custom-control custom-checkbox my-2">
                                        <input type="checkbox" class="custom-control-input" id="martini" />
                                        <label class="custom-control-label text-white font-weight-normal" for="martini">$ 6.00
                                        </label>
                                        <img src="/assets/img/martini.png" class="img-fluid" width="40" />
                                    </div>
                                    <div class="custom-control custom-checkbox my-2">
                                        <input type="checkbox" class="custom-control-input" id="fruit" />
                                        <label class="custom-control-label text-white font-weight-normal" for="fruit">$ 8.00
                                        </label>
                                        <img src="/assets/img/fruit.png" class="img-fluid" width="40" />
                                    </div>
                                    <div class="custom-control custom-checkbox my-2">
                                        <input type="checkbox" class="custom-control-input" id="shampain" />
                                        <label class="custom-control-label text-white font-weight-normal" for="shampain">$ 10.00
                                        </label>
                                        <img src="/assets/img/shampain.png" class="img-fluid" width="40" />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-lg-5 offset-1">
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <h4 class="text-warning">Payment Info</h4>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Bill Name</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Address</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Address 2</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">City</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">State</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">ZIP</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Credit Card Number</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Expiration MO/YR</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                    <input type="text" class="form-control form-control-sm mb-2" />
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <label class="text-white">Security Code</label>
                                </div>
                                <div class="col-lg-5 offset-lg-1">
                                </div>
                                <div class="col-lg-6 pl-lg-0">
                                    <button type="button" class="btn btn-gradient font-16 pt-1 pb-1 px-5 mt-2 mb-5">BUY NOW</button>
                                </div>
                            </div>
                        </div>
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
    </div>
  );
};

export default Participant;
