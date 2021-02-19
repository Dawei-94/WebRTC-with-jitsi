import React from "react";

const Reactions = ({ playSoundEffect, toggle }) => {
  return (
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
            <img src="/assets/img/pump-up.jpg" className="img-fluid" />
            <button
              type="button"
              className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
              onClick={playSoundEffect}
              disabled={toggle}
            >
              PUMP UP
            </button>
          </div>
          <div className="item">
            <img src="/assets/img/rave-on.jpg" className="img-fluid" />
            <button
              type="button"
              className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
              onClick={playSoundEffect}
              disabled={toggle}
            >
              RAVE ON
            </button>
          </div>
          <div className="item">
            <img src="/assets/img/shout-it.jpg" className="img-fluid" />
            <button
              type="button"
              className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
              onClick={playSoundEffect}
              disabled={toggle}
            >
              SHOUT IT
            </button>
          </div>
          <div className="item">
            <img src="/assets/img/right-on.jpg" className="img-fluid" />
            <button
              type="button"
              className="btn btn-sm btn-block btn-custom font-weight-normal mt-1 pt-0 pb-0"
              onClick={playSoundEffect}
              disabled={toggle}
            >
              RIGHT ON
            </button>
          </div>
        </div>
      </div>
      <div className="col-lg-1 col-sm-1 p-0">
        <a className="next btn-right-img">
          <img src="/assets/img/arrow-right1.png" className="img-fluid" />
        </a>
      </div>
    </div>
  );
};

export default Reactions;
