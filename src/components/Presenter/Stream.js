import React, { useState } from "react";

const Stream = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingThree"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
              onClick={() => setToggle(!toggle)}
            >
              Stream
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingThree"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev1">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid"
                    id="stream-left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div id="Stream" className="owl-carousel owl-demo">
                  <div className="item">
                    <img
                      src="/assets/img/stream-sample-1.png"
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
                      src="/assets/img/stream-sample-2.png"
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
                      src="/assets/img/stream-sample-1.png"
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
                      src="/assets/img/stream-sample-2.png"
                      className="img-fluid"
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
                <a className="next1" id="stream-right-img">
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

export default Stream;
