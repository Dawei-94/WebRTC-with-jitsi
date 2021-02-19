import React, { useState } from "react";

const Rooms = ({ changeBackgroundImage }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingTwo"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
              onClick={() => setToggle(!toggle)}
            >
              Room
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingTwo"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div id="Room" className="owl-carousel owl-demo">
                  <div className="item">
                    <img
                      src="/assets/img/room-sample-1.png"
                      className="img-fluid"
                      onClick={() =>
                        changeBackgroundImage("/assets/img/room-sample-1.png")
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
                    >
                      UPLOAD
                    </button>
                  </div>
                  <div className="item">
                    <img
                      src="/assets/img/room-sample-2.png"
                      className="img-fluid"
                      onClick={() =>
                        changeBackgroundImage("/assets/img/room-sample-2.png")
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
                    >
                      UPLOAD
                    </button>
                  </div>
                  <div className="item">
                    <img
                      src="/assets/img/room-sample-3.png"
                      onClick={() =>
                        changeBackgroundImage("/assets/img/room-sample-3.png")
                      }
                      className="img-fluid"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
                    >
                      UPLOAD
                    </button>
                  </div>
                  <div className="item">
                    <img
                      src="/assets/img/room-sample-4.png"
                      className="img-fluid"
                      onClick={() =>
                        changeBackgroundImage("/assets/img/room-sample-4.png")
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
                    >
                      UPLOAD
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="next">
                  <img
                    src="/assets/img/arrow-right1.png"
                    className="img-fluid btn-right-img"
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

export default Rooms;
