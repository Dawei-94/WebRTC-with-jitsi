import React, { useState } from "react";

const UserPhotos = ({ userPhotos }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="col-lg-12 mt-2">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingFive"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseFive"
              onClick={() => setToggle(!toggle)}
            >
              User Photos
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseFive"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingFive"
        >
          <div className="card-body bg-section">
            <div className="row">
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="prev3">
                  <img
                    src="/assets/img/arrow-left.png"
                    className="img-fluid"
                    id="user-left-img"
                  />
                </a>
              </div>
              <div className="col-lg-10 col-sm-10">
                <div
                  id="UserPhotos"
                  className="owl-carousel owl-demo"
                  ref={userPhotos}
                ></div>
              </div>
              <div className="col-lg-1 col-sm-1 p-0">
                <a className="next3" id="user-right-img">
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

export default UserPhotos;
