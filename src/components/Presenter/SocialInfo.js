import React, { useState } from "react";

const SocialInfo = ({ updateSocialInfos }) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    updateSocialInfos(name, value);
  };

  return (
    <div className="col-lg-12">
      <div className="card rounded-0 border-0">
        <div
          className="card-header rounded-0 bg-black p-0 pl-4"
          id="headingOne"
        >
          <h5 className="mb-0">
            <button
              className="btn btn-link heading-btn"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={() => setToggle(!toggle)}
            >
              Social Info
              <img src="/assets/img/arrow-right.png" className="float-right" />
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className={toggle ? "collapse show" : "collapse"}
          aria-labelledby="headingOne"
        >
          <div className="card-body bg-form">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  PAYPAL
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    placeholder="djstar@gmail.com"
                    name={"paypal"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  INSTAGRAM
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    name={"instagram"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  TWITTER
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    name={"twitter"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  FACEBOOK
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    name={"facebook"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  TIKTOK
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    name={"tiktok"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  YOUTUBE
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    name={"youtube"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm text-right text-white"
                >
                  SNAPCHAT
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name={"snapchat"}
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialInfo;
