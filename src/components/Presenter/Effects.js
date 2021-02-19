import React, { useState } from "react";

const Effects = ({ addEffect }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingFour"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
              onClick={() => setToggle(!toggle)}
            >
              Effects
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseFour"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingFour"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev2">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid"
                    id="effect-left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div id="Effects" className="owl-carousel owl-demo">
                  <div className="item">
                    <button
                      type="button"
                      className="btn btn-effect"
                      onClick={() => addEffect("blur")}
                    >
                      Blur
                    </button>
                    <button type="button" className="btn btn-effect">
                      Other 1
                    </button>
                  </div>
                  <div className="item">
                    <button
                      type="button"
                      className="btn btn-effect"
                      onClick={() => addEffect("grayscale")}
                    >
                      BLK/WHT
                    </button>
                    <button type="button" className="btn btn-effect">
                      Other 2
                    </button>
                  </div>
                  <div className="item">
                    <button
                      type="button"
                      className="btn btn-effect"
                      onClick={() => addEffect("trippy")}
                    >
                      Trippy
                    </button>
                    <button type="button" className="btn btn-effect">
                      Other 3
                    </button>
                  </div>
                  <div className="item">
                    <button
                      type="button"
                      className="btn btn-effect"
                      onClick={() => addEffect("inverse")}
                    >
                      Inverse
                    </button>
                    <button type="button" className="btn btn-effect">
                      Other 4
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="next2" id="effect-right-img">
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

export default Effects;
