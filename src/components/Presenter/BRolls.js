import React, { useState } from "react";

const BRolls = ({ brollToggle, broll }) => {
  const [toggle, setToggle] = useState(false);

  function handleBroll() {
    if (brollToggle) return;
    broll();
  }
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingSeven"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseSeven"
              aria-expanded="true"
              aria-controls="collapseSeven"
              onClick={() => setToggle(!toggle)}
            >
              B-ROLLS
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseSeven"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingSeven"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev5">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid"
                    id="rolls-left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div id="BRolls" className="owl-carousel owl-demo">
                  <div className="item">
                    <img
                      src="/assets/img/b-rolls-smaple-1.png"
                      className="img-fluid"
                      onClick={handleBroll}
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
                      src="/assets/img/b-rolls-smaple-2.png"
                      className="img-fluid"
                      onClick={handleBroll}
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
                      src="/assets/img/b-rolls-smaple-3.png"
                      className="img-fluid"
                      onClick={handleBroll}
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
                      src="/assets/img/b-rolls-smaple-4.png"
                      className="img-fluid"
                      onClick={handleBroll}
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
                <a className="next5" id="rolls-right-img">
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

export default BRolls;
