import React, { useState } from "react";
import ParticipantStremVideo from "./ParticipantStremVideo";

const LiveParticipantsStream = ({ liveParticipantVideos }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingSix"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseSix"
              aria-expanded="true"
              aria-controls="collapseSix"
              onClick={() => setToggle(!toggle)}
            >
              LIVE PARTICIPANTS STREAM
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseSix"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingSix"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev4">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid"
                    id="live-left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div
                  id="Live"
                  className="owl-carousel owl-demo"
                  ref={liveParticipantVideos}
                ></div>
              </div>
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="next4" id="live-right-img">
                  <img
                    src="/assets/img/arrow-right1.png"
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveParticipantsStream;
